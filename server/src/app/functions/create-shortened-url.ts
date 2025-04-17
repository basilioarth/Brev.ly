import { db } from '../../infra/db/index.ts';
import { schema } from '../../infra/db/schemas/index.ts';
import { type Either, makeLeft, makeRight } from '../../shared/either.ts';
import { z } from 'zod';
import { BadlyFormattedShortenedURL } from './errors/badly-formatted-shortened-url.ts';
import { ShortenedURLAlreadyExists } from './errors/shortened-URL-already-exists.ts';

const shortenedUrlInput = z.object({
    original_url: z.string().url().nonempty(),
    shortened_url: z.string().nonempty(),
});

type ShortenedUrlInput = z.input<typeof shortenedUrlInput>

export async function createShortenedUrl(
    input: ShortenedUrlInput
): Promise<Either<BadlyFormattedShortenedURL | ShortenedURLAlreadyExists, { urlID: string }>> {
    const { original_url, shortened_url } = shortenedUrlInput.parse(input);

    const isValidShortenedUrl = /^[a-zA-Z0-9_-]+$/.test(shortened_url);

    if (!isValidShortenedUrl) {
        return makeLeft(new BadlyFormattedShortenedURL());
    }

    try {
        const result = await db.insert(schema.urls).values({
            originalUrl: original_url,
            shortenedUrl: shortened_url
        }).returning({ id: schema.urls.id });

        return makeRight({ urlID: result[0].id });
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