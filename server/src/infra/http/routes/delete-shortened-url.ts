import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { deleteShortenedUrl } from '../../../app/functions/delete-shortened-url.ts';
import { isRight, unwrapEither } from '../../../shared/either.ts';

export const deleteShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
    server.delete(
        '/urls/:id',
        {
            schema: {
                summary: 'Delete a shortened url',
                params: z.object({
                    id: z.string().uuid()
                }),
                response: {
                    204: z.null().describe('Url deleted'),
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

            const result = await deleteShortenedUrl({
                id: request.params.id
            });

            if (isRight(result)) {
                return reply.status(204).send()
            }

            const error = unwrapEither(result)

            switch (error.constructor.name) {
                case 'RecordNotFound':
                    return reply.status(404).send({ message: error.message })
            }
        }
    )
}