import { config } from '../config/env.js';
import { JsonFileLeadRepository } from './JsonFileLeadRepository.js';
import { PostgresLeadRepository } from './PostgresLeadRepository.js';
import type { LeadRepository } from './LeadRepository.js';

export function createLeadRepository(): LeadRepository {
  if (config.leadStorage === 'postgres') {
    if (!config.databaseUrl) throw new Error('LEAD_STORAGE=postgres requires DATABASE_URL');
    return new PostgresLeadRepository(config.databaseUrl);
  }
  return new JsonFileLeadRepository(config.storageDir);
}
