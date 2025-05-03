import { eq } from 'drizzle-orm/pg-core/expressions';
import { db } from '../../infra/db/index.ts';
import { schema } from '../../infra/db/schemas/index.ts';
import { type Either, makeLeft, makeRight } from '../../shared/either.ts';
import { z } from 'zod';
import { RecordNotFound } from './errors/record-not-found.ts';
import type { AnyColumn } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

const incrementUrlAccessInput = z.object({
    shortenedUrl: z.string().nonempty(),
});

type IncrementUrlAccessInput = z.input<typeof incrementUrlAccessInput>;

export async function incrementUrlAccessCount(
    input: IncrementUrlAccessInput
): Promise<Either<RecordNotFound | Error, { id: string; accessCount: number }>> {
    try {
        const increment = (column: AnyColumn, value = 1) => {
            return sql`${column} + ${value}`;
        };
        
        const result = await db
            .update(schema.urls)
            .set({ accessCount: increment(schema.urls.accessCount) })
            .where(eq(schema.urls.shortenedUrl, input.shortenedUrl))
            .returning({
                id: schema.urls.id,
                access_count: schema.urls.accessCount,
            });

        if (result.length === 0) {
            return makeLeft(new RecordNotFound());
        }

        return makeRight({
            id: result[0].id,
            accessCount: result[0].access_count,
        });
    } catch (error) {
        return makeLeft(error as Error);
    }
}