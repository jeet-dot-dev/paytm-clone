import { PrismaClient } from "@repo/db";
const db = new PrismaClient();
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "89269..." },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) return null;

        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (isValidPassword) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const newUser = await db.user.create({
          data: {
            number: credentials.phone,
            password: hashedPassword,
            email: "",
            name: "",
          },
        });

        return {
          id: newUser.id.toString(),
          name: newUser.name,
          email: newUser.email,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "Jeet",
    callbacks: {
      async session({ token, session }: { token: JWT; session: Session }) {
        if (session.user) {
          session.user.id = token.sub!;
        }
        return session;
      }
    }
};
