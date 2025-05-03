import { eq } from 'drizzle-orm/pg-core/expressions';
import { db } from '../../infra/db/index.ts';
import { schema } from '../../infra/db/schemas/index.ts';
import { type Either, makeLeft, makeRight } from '../../shared/either.ts';
import { z } from 'zod';
import { RecordNotFound } from './errors/record-not-found.ts';

const deleteUrlInput = z.object({
    shortenedUrl: z.string().nonempty(),
});

type DeleteUrlInput = z.input<typeof deleteUrlInput>;

export async function deleteUrl(
    input: DeleteUrlInput
): Promise<Either<RecordNotFound | Error, { message: string }>> {
    try {
        const result = await db.delete(schema.urls).where(
            eq(schema.urls.shortenedUrl, input.shortenedUrl)
        ).returning();

        if(result.length === 0) {
            return makeLeft(new RecordNotFound());
        }

        return makeRight({ message: 'URL deleted successfully' });
    } catch (error) {
        return makeLeft(error as Error);
    }
}