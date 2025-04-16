import { env } from '../../env.ts';
import { drizzle } from 'drizzle-orm/postgres-js';
import { schema } from './schemas/index.ts';
import postgres from 'postgres';

export const pg = postgres(env.DATABASE_URL)
export const db = drizzle(pg, { schema })