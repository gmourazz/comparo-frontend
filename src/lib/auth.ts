import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/**
 * Single-admin login for /admin (spec: "autenticação simples e segura para
 * MVP"). No self-serve signup, no OAuth — just one email + bcrypt hash pair
 * from env, checked against a submitted password.
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) return null;
        if (!credentials?.email || !credentials.password) return null;
        if (credentials.email.toLowerCase() !== adminEmail.toLowerCase()) return null;

        const valid = await bcrypt.compare(credentials.password, adminHash);
        if (!valid) return null;

        return { id: "admin", email: adminEmail, name: "Admin" };
      },
    }),
  ],
};
