import { db } from '../../infra/db/index.ts';
import { schema } from '../../infra/db/schemas/index.ts';
import { type Either, makeLeft, makeRight } from '../../shared/either.ts';
import { z } from 'zod';
import { BadlyFormattedShortenedURL } from './errors/badly-formatted-shortened-url.ts';
import { ShortenedURLAlreadyExists } from './errors/shortened-URL-already-exists.ts';

const createShortenedUrlInput = z.object({
    original_url: z.string().url().nonempty(),
    shortened_url: z.string().nonempty(),
});

type CreateShortenedUrlInput = z.input<typeof createShortenedUrlInput>

export async function createShortenedUrl(
    input: CreateShortenedUrlInput
): Promise<Either<BadlyFormattedShortenedURL | ShortenedURLAlreadyExists, { 
    id: string, 
    originalUrl: string, 
    shortenedUrl: string, 
    accessCount: number, 
    createdAt: Date 
}>> {
    const { original_url, shortened_url } = createShortenedUrlInput.parse(input);

    const isValidShortenedUrl = /^[a-zA-Z0-9_-]+$/.test(shortened_url);

    if (!isValidShortenedUrl) {
        return makeLeft(new BadlyFormattedShortenedURL());
    }

    try {
        const result = await db.insert(schema.urls).values({
            originalUrl: original_url,
            shortenedUrl: shortened_url
        }).returning({ 
            id: schema.urls.id,
            originalUrl: schema.urls.originalUrl,
            shortenedUrl: schema.urls.shortenedUrl,
            accessCount: schema.urls.accessCount,
            createdAt: schema.urls.createdAt
        });

        return makeRight({
            id: result[0].id,
            originalUrl: result[0].originalUrl,
            shortenedUrl: result[0].shortenedUrl,
            accessCount: result[0].accessCount,
            createdAt: result[0].createdAt
         });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message.includes('duplicate key value violates unique constraint "urls_shortened_url_unique"')
        ) {
            return makeLeft(new ShortenedURLAlreadyExists());
        }
        throw error;
    }
}