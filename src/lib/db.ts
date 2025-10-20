import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let db;

if (process.env.NODE_ENV === 'production' && process.env.MOCK_DB === 'true') {
  db = {
    board: {
      findMany: async () => [],
      findUnique: async () => null,
      create: async (data) => data,
    },
    list: {
      findFirst: async () => null,
      create: async (data) => data,
      delete: async (data) => data,
      update: async (data) => data,
    },
    card: {
      findFirst: async () => null,
      create: async (data) => data,
    },
  };
} else {
  if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
  } else {
    if (!globalThis.prisma) {
      globalThis.prisma = new PrismaClient();
    }
    db = globalThis.prisma;
  }
}

export { db };