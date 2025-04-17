import { eq } from 'drizzle-orm/pg-core/expressions';
import { db } from '../../infra/db/index.ts';
import { schema } from '../../infra/db/schemas/index.ts';
import { type Either, makeLeft, makeRight } from '../../shared/either.ts';
import { z } from 'zod';
import { RecordNotFound } from './errors/record-not-found.ts';

const input = z.object({
    id: z.string().uuid()
});

type Input = z.input<typeof input>;

export async function deleteShortenedUrl(
    input: Input
): Promise<Either<Error, { message: string }>> {
    try {
        const result = await db.delete(schema.urls).where(
            eq(schema.urls.id, input.id)
        ).returning();

        if(result.length === 0) {
            return makeLeft(new RecordNotFound());
        }

        return makeRight({ message: 'URL deleted successfully' });
    } catch (error) {
        return makeLeft(new Error('Failed to delete URL'));
    }
}