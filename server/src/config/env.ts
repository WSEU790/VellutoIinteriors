import 'dotenv/config';
import path from 'node:path';

const num = (v: string | undefined, d: number) => (v && !Number.isNaN(Number(v)) ? Number(v) : d);

export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: num(process.env.PORT, 3001),
  corsOrigins: (process.env.CORS_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean),
  leadStorage: (process.env.LEAD_STORAGE ?? 'json') as 'json' | 'postgres',
  storageDir: path.resolve(process.env.STORAGE_DIR ?? './storage'),
  databaseUrl: process.env.DATABASE_URL,
  uploadMaxFiles: num(process.env.UPLOAD_MAX_FILES, 6),
  uploadMaxBytes: num(process.env.UPLOAD_MAX_MB, 10) * 1024 * 1024,
  webhookUrl: process.env.LEAD_WEBHOOK_URL || undefined,
  webhookSecret: process.env.LEAD_WEBHOOK_SECRET || undefined,
  adminToken: process.env.ADMIN_API_TOKEN || undefined,
  staticDir: path.resolve(process.env.STATIC_DIR ?? './dist'),
  trustProxy: process.env.TRUST_PROXY ?? 'loopback',
};
