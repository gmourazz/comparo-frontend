import type { Machine } from "@/types/machine";
import { formatBoolean } from "@/lib/formatters";

export function SpecsList({ machine }: { machine: Machine }) {
  const connectivity = [
    machine.hasChip ? "Chip próprio" : null,
    machine.hasWifi ? "Wi-Fi" : null,
    machine.hasBluetooth ? "Bluetooth" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const specs: { k: string; v: string }[] = [
    { k: "Conectividade", v: connectivity || "Não informado" },
    { k: "NFC / aproximação", v: formatBoolean(machine.hasNfc) },
    { k: "Impressora", v: machine.hasPrinter === true ? "Integrada" : machine.hasPrinter === false ? "Não possui" : "Não informado" },
    { k: "Touchscreen", v: formatBoolean(machine.hasTouchscreen) },
    { k: "Sistema", v: machine.operatingSystem ?? "Não informado" },
    { k: "Bateria", v: machine.batteryDescription ?? "Não informado" },
    { k: "Precisa de celular", v: formatBoolean(machine.requiresPhone) },
    { k: "Comprovante", v: machine.receiptDescription ?? "Não informado" },
    { k: "Recebimento", v: machine.settlementDescription ?? "Não informado" },
  ];

  return (
    <div className="rounded-[20px] border border-border bg-white p-7">
      <h2 className="m-0 font-manrope text-[22px] font-bold">Características</h2>
      <div className="mt-5 flex flex-col">
        {specs.map((s) => (
          <div key={s.k} className="flex justify-between gap-4 border-b border-[#F2F4F8] py-3 last:border-b-0">
            <span className="font-inter text-[15px] text-muted">{s.k}</span>
            <span className="text-right font-inter text-[15px] font-semibold text-text">{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
