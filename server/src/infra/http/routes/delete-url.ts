import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { deleteUrl } from '../../../app/functions/delete-url.ts';
import { isRight, unwrapEither } from '../../../shared/either.ts';

export const deleteUrlRoute: FastifyPluginAsyncZod = async server => {
    server.delete(
        '/urls/:shortenedUrl',
        {
            schema: {
                summary: 'Delete a url by the given shortenedUrl',
                params: z.object({
                    shortenedUrl: z.string().nonempty(),
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

            const result = await deleteUrl({
                shortenedUrl: request.params.shortenedUrl
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