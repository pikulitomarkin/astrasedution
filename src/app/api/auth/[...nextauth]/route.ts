import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { AuthOptions } from "next-auth";

// Armazenamento em memória (apenas para demonstração)
// Em produção, substitua por um banco de dados real
interface LocalUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

const users: LocalUser[] = [];

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
        name: { label: "Nome", type: "text", required: false }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = users.find(user => user.email === credentials.email);
        
        if (!existingUser) {
          // Criar novo usuário
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser: LocalUser = {
            id: Date.now().toString(),
            email: credentials.email,
            name: credentials.name || "",
            password: hashedPassword,
          };
          users.push(newUser);
          return newUser;
        }

        // Verificar senha
        const isValid = await bcrypt.compare(credentials.password, existingUser.password);
        if (!isValid) {
          return null;
        }

        return existingUser;
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };