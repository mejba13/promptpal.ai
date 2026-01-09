import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // For production, use environment variable
  // For development, use local SQLite file
  const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

  const adapter = new PrismaLibSql({
    url: databaseUrl,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// Export types for use in components
export type {
  User,
  Session,
  Category,
  Prompt,
  PromptTemplate,
  Favorite,
  AIModel,
  Generation,
  FlaggedContent,
  PlatformSetting,
  PricingTier,
  CreditTransaction,
  Notification
} from '@prisma/client';

// Export enums
export {
  Role,
  Plan,
  UserStatus,
  PromptType,
  GenerationStatus,
  ModerationStatus,
  TransactionType,
  NotificationType
} from '@prisma/client';
