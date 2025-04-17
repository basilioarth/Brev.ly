import { eq } from 'drizzle-orm/pg-core/expressions';
import { db } from '../../infra/db/index.ts';
import { schema } from '../../infra/db/schemas/index.ts';
import { type Either, makeLeft, makeRight } from '../../shared/either.ts';
import { z } from 'zod';

const getAllUrlsOutput = z.array(
    z.object({
        id: z.string().uuid(),
        originalUrl: z.string().url().nonempty(),
        shortenedUrl: z.string().nonempty(),
        accessCount: z.number().int().nonnegative(),
        createdAt: z.date(),
    })
);

type GetAllUrlsOutput = z.infer<typeof getAllUrlsOutput>;

export async function getAllUrls(): Promise<Either<Error, { data: GetAllUrlsOutput }>> {
    try {
        const urls = (await db.select().from(schema.urls));

        return makeRight({ data: urls });
    } catch (error) {
        return makeLeft(error as Error);
    }
}