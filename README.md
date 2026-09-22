# comparô — comparador de maquininhas de cartão

Comparador independente de maquininhas (Mercado Pago Point x Ton): catálogo, filtros, comparador,
quiz de recomendação e redirect de afiliado com tracking. Não processa pagamento nem faz checkout.

## Arquitetura

Dois serviços separados, dois repositórios:

- **Frontend** (este repo, `src/`): Next.js 16 (App Router) + TypeScript + Tailwind v4. Só
  apresentação — filtros, ordenação, badges, quiz e comparação rodam como funções puras em
  TypeScript sobre os dados que vêm da API. Sem banco, sem Prisma.
- **Backend** (`backend/`, também publicado em [github.com/gmourazz/comparo-backend](https://github.com/gmourazz/comparo-backend)):
  Go (stdlib `net/http` + `pgx`), dono de todo dado — serve o catálogo, resolve link de afiliado,
  faz o redirect com tracking, roda o scraping/sync do Mercado Pago e da Ton, e expõe o status
  pro admin. Banco: Postgres no Supabase.

```
Browser → Next.js (SSR/Server Components) → Go API → Postgres (Supabase)
                                                ↑
                              cron (2x/dia) → POST /api/internal/catalog/sync
                                                ↑
                              scraping ao vivo: mercadopago.com.br, ton.com.br
```

## Rodando local

Precisa dos dois serviços rodando ao mesmo tempo.

**Backend:**
```bash
cd backend
cp .env.example .env   # preenche DATABASE_URL, CATALOG_SYNC_SECRET
go run ./cmd/api        # sobe em :8080
```

**Frontend** (em outro terminal, na raiz):
```bash
cp .env.example .env   # API_URL=http://localhost:8080, mais admin/analytics
pnpm install
pnpm run dev            # sobe em :3000
```

## Banco de dados

Postgres no Supabase. As tabelas (`Machine`, `CatalogSync`, `CatalogChange`, `TrackingEvent`)
foram criadas via Prisma numa fase anterior do projeto (`prisma migrate`/`db push`) e o backend Go
lê/escreve nelas direto via SQL — não há Prisma no backend, só reaproveita o schema já criado.
Se precisar recriar o banco do zero, o shape das tabelas está documentado nos comentários de
`backend/internal/machine/model.go` e pode ser recriado com `CREATE TABLE` equivalente (ou
reidratando `prisma/` de um commit anterior, se ainda existir no histórico do repo).

**Conexão via pooler do Supabase**: use o host do "Shared pooler" na porta **5432** (modo sessão),
não a porta 6543 (modo transação) — o driver `pgx` do Go usa prepared statements por padrão e
6543 quebra com "prepared statement does not exist". Isso é diferente do que o Next.js/Prisma
precisava antes (que exigia `?pgbouncer=true` na 6543) — não se aplica mais, já que não há Prisma
no fluxo atual.

## Fontes de dados — o que é automático e o que não é

**Mercado Pago** (`mercadopago.com.br/ferramentas-para-vender/maquininhas-point`):
- ✅ Automático: nome, imagem, preço à vista, preço "de", desconto, parcelamento, tagline —
  raspado da página pública (HTML estático, servidor-renderizado).
- ✅ Automático (derivado por palavra-chave do texto oficial): NFC, impressora, Wi-Fi, chip,
  touchscreen — extraído do `alt` da imagem de cada produto.
- ❌ **Manual**: taxas (Pix/débito/crédito/parcelado). A página renderiza esses números com um
  widget de animação tipo "caça-níquel" (dígitos em CSS/JS, sem texto estático) — não dá pra
  raspar sem executar JavaScript. Ficam `null` no banco até alguém preencher à mão.

**Ton** (`ton.com.br/maquininhas`):
- ✅ Automático: nome, preço, desconto, parcelamento, e um conjunto rico de recursos (NFC, chip,
  Wi-Fi, impressora, touchscreen, sistema operacional, bateria) — mas só depois de renderizar a
  página com um navegador headless (Chromium via `chromedp`). O HTML estático não tem esses dados
  — confirmado por teste direto (`curl` não vê nada, só aparece depois de JS rodar).
- ❌ **Manual**: taxas por transação — ficam atrás de um simulador JS separado, mesma limitação da MP.

Nenhum dado é inventado: campo sem fonte confiável fica `null`/`undefined` e a UI mostra
"Não informado" (nunca transforma desconhecido em "Não").

## Sincronização do catálogo

`POST /api/internal/catalog/sync` (protegido por header `X-Sync-Secret`, precisa bater com
`CATALOG_SYNC_SECRET`). Roda os dois providers, cada um isolado — um falhar não trava o outro.

**Last known good**: zero produtos retornados = falha, catálogo anterior é preservado (nunca
publica um catálogo vazio). Queda de mais de 80% nos produtos ativos ou preço mudando de forma
implausível (5x pra mais ou menos) geram *warning* no log, mas não bloqueiam — ficam visíveis no
admin pra revisão humana.

**Cron**: serviço separado `comparo-sync-cron` na Railway, com `cronSchedule` nativo (2x/dia,
09:03 e 21:03 UTC), que só faz um `curl` no endpoint acima. Pra mudar a frequência, edita o
`cronSchedule` desse serviço no dashboard da Railway (Settings → Deploy → Cron Schedule).

**Rodar manualmente**: pelo `/admin` (botão "Sincronizar agora") ou direto:
```bash
curl -X POST "$API_URL/api/internal/catalog/sync?trigger=manual" -H "X-Sync-Secret: $CATALOG_SYNC_SECRET"
```

## Links de afiliado

Resolvidos em runtime (`backend/internal/affiliate/resolve.go`), nunca persistidos no banco.
Prioridade: env var específica da máquina → env var geral da marca → CTA desabilitado (nunca cai
num link genérico silenciosamente).

```
TON_AFFILIATE_URL=https://...              # geral da marca
TON_T1_AFFILIATE_URL=https://...           # específico do modelo (slug "ton-t1" em maiúsculo)
MERCADO_PAGO_AFFILIATE_URL=https://...
```

O frontend mostra o botão de compra desabilitado (com aviso) quando não há link configurado —
nunca um link que dá 404.

## Admin

`/admin` — login único (NextAuth Credentials), sem cadastro. Configura em `.env`:
```bash
ADMIN_EMAIL=voce@exemplo.com
ADMIN_PASSWORD_HASH=$(node -e "console.log(require('bcryptjs').hashSync('sua-senha', 10))")
```

⚠️ **Hashes bcrypt têm `$` literal** — o carregador de env do Next.js expande `$VAR` como
referência de variável. Escreva o hash no `.env` com `$` escapado (`\$2b\$10\$...`), senão ele
trunca silenciosamente e o login nunca funciona (sem erro claro).

Dashboard mostra: produtos ativos por marca, última tentativa/sucesso de sync, avisos/erros
recentes, últimas mudanças (`CatalogChange`) e botão pra sincronizar na hora.

## Deploy

- **Backend**: Docker (`backend/Dockerfile`, inclui Chromium pra Ton) → publicado em
  `ghcr.io/gmourazz/comparo-backend` → Railway (projeto "backend", serviço `comparo-backend`).
  Pra atualizar: `docker buildx build --platform linux/amd64 -t ghcr.io/gmourazz/comparo-backend:latest --push backend/`,
  depois redeploy no Railway (ou configura auto-deploy quando o GitHub App tiver acesso ao repo).
- **Frontend**: ainda não publicado. Vercel é o alvo natural pra Next.js; só precisa configurar
  `API_URL`/`NEXT_PUBLIC_API_URL` apontando pra URL pública do backend na Railway.

## O que falta (não implementado ainda)

- **SEO técnico**: sitemap.ts, robots.ts, JSON-LD estruturado (Product/Offer/FAQPage/BreadcrumbList).
  Metadata básica existe por página, mas o resto da spec original não foi implementado depois da
  virada de arquitetura pra Go.
- **Analytics**: banner de cookies com 3 categorias (Necessário/Analytics/Marketing) já funciona
  e persiste a escolha, mas os scripts do GA4/Meta Pixel em si (carregar só depois do
  consentimento) ainda não foram plugados.
- **Rate limiting** no endpoint de sync e no login do admin: nenhum implementado ainda (o sync
  já é protegido por secret; o login por senha — mas sem limite de tentativas).
- Investigar se a Ton expõe um endpoint JSON direto (estilo Deco.cx `/live/invoke/...`) que
  dispense o Chromium — não encontrado numa primeira passada, mas não descartado.

## Testes

```bash
# Frontend
pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run build && pnpm run test:e2e

# Backend
cd backend && go build ./... && go vet ./... && go test ./...
```

Testes do backend rodam contra fixtures reais salvas em `backend/internal/providers/*/fixtures/`
(HTML/JSON de verdade, sanitizado) — não dependem de rede.

## Como adicionar uma nova marca (ex.: PagBank, Stone, InfinitePay)

1. `backend/internal/providers/<marca>/{fetch,parse}.go` implementando a interface
   `providers.CatalogProvider` (veja `mercadopago/` como exemplo de scraping estático,
   `ton/` como exemplo de headless render).
2. Fixture real em `fixtures/` + teste (`parse_test.go`) validando os campos extraídos.
3. Adiciona o provider na lista em `backend/internal/httpapi/handlers_sync.go`.
4. Configura `<MARCA>_AFFILIATE_URL` no `.env` do backend.

Nenhuma mudança no frontend é necessária — ele só lê `GET /api/machines`, que já devolve
qualquer provider cadastrado.
