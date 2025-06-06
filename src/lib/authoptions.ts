// /lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prismadb from "./db";
import { AuthOptions } from "next-auth";
import { generateAccessToken, generateRefreshToken } from "./jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) return null;

        const user = await prismadb.user.findUnique({
          where: { name: credentials.name },
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;


        const accessToken = generateAccessToken({ id: user.id, name: user.name });
        const refreshToken = generateRefreshToken({ id: user.id, name: user.name });

        return { id: user.id, name: user.name, accessToken,
          refreshToken, };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};
