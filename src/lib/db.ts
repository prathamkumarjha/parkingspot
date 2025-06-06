// lib/db.ts
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@/generated/prisma";
declare global {
  // Allow global `prisma` to exist in dev with hot-reloading
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismadb;
}

export default prismadb;
