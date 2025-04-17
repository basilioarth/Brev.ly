import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getAllUrls } from '../../../app/functions/get-all-urls.ts';
import { isRight, unwrapEither } from '../../../shared/either.ts';

export const getAllUrlsRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/urls',
        {
            schema: {
                summary: 'Get all urls',
                response: {
                    200: z.array(
                        z.object({
                            id: z.string().uuid(),
                            originalUrl: z.string().url().nonempty(),
                            shortenedUrl: z.string().nonempty(),
                            accessCount: z.number().int().nonnegative(),
                            createdAt: z.date(),
                        })
                    ).describe('Urls found'),
                    500: z.object({
                        message: z.string()
                    }).describe('Internal server error'),
                }
            }
        },
        async (request, reply) => {
            const result = await getAllUrls();

            if (isRight(result)) {
                return reply.status(200).send(result.right.data)
            }

            const error = unwrapEither(result)

            return reply.status(500).send({ message: error.message })
        }
    )
}