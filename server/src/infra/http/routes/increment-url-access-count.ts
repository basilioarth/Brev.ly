import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { incrementUrlAccessCount } from '../../../app/functions/increment-url-access-count.ts';
import { isRight, unwrapEither } from '../../../shared/either.ts';

export const incrementUrlAccessCountRoute: FastifyPluginAsyncZod = async server => {
    server.patch(
        '/urls/increment-access-count/:shortenedUrl',
        {
            schema: {
                summary: 'Increment the access count of an url by the given shortenedUrl',
                params: z.object({
                    shortenedUrl: z.string().nonempty(),
                }),
                response: {
                    200: z.object({
                        id: z.string().uuid(),
                        accessCount: z.number().int().nonnegative(),
                    }).describe('Url access count incremented'),
                    400: z.object({
                        message: z.string()
                    }).describe('Validation error'),
                    404: z.object({
                        message: z.string()
                    }).describe('Url not found'),
                    500: z.object({
                        message: z.string()
                    }).describe('Internal server error'),
                }
            }
        },
        async (request, reply) => {
            const result = await incrementUrlAccessCount({
                shortenedUrl: request.params.shortenedUrl
            });

            if (isRight(result)) {
                return reply.status(200).send({ id: result.right.id, accessCount: result.right.accessCount })
            }

            const error = unwrapEither(result)

            switch (error.constructor.name) {
                case 'RecordNotFound':
                    return reply.status(404).send({ message: error.message })
            }
        }
    )              
}