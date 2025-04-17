import { eq } from 'drizzle-orm/pg-core/expressions';
import { db } from '../../infra/db/index.ts';
import { schema } from '../../infra/db/schemas/index.ts';
import { type Either, makeLeft, makeRight } from '../../shared/either.ts';
import { z } from 'zod';
import { RecordNotFound } from './errors/record-not-found.ts';

const getOriginalUrlByShortenedUrlInput = z.object({
    shortened_url: z.string().nonempty(),
});

type GetOriginalUrlByShortenedUrlInput = z.input<typeof getOriginalUrlByShortenedUrlInput>

export async function getOriginalUrlByShortenedUrl(
    input: GetOriginalUrlByShortenedUrlInput
): Promise<Either<RecordNotFound | Error, { originalUrl: string }>> {
    try {
        const result = await db.select().from(schema.urls).where(
            eq(schema.urls.shortenedUrl, input.shortened_url)
        );
    
        if (result.length === 0) {
            return makeLeft(new RecordNotFound());
        }
    
        return makeRight({ originalUrl: result[0].originalUrl });
    } catch (error) {
        return makeLeft(error as Error);
    }
}