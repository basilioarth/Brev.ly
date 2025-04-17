import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { getOriginalUrlByShortenedUrl } from '../../../app/functions/get-original-url-by-shortened-url.ts';
import { isRight, unwrapEither } from '../../../shared/either.ts';

// TODO: MODIFICAR PARA ROUTE PARAMS

export const getOriginalUrlByShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        '/urls/original-url/:shortened_url',
        {
            schema: {
                summary: 'Get the original url by the given shortened url',
                params: z.object({
                    shortened_url: z.string().nonempty(),
                }),
                response: {
                    200: z.object({
                        originalUrl: z.string().url().nonempty()
                    }).describe('Original url found'),
                    400: z.object({
                        message: z.string()
                    }).describe('Validation error'),
                    404: z.object({
                        message: z.string()
                    }).describe('Shortened url not found'),
                    500: z.object({
                        message: z.string()
                    }).describe('Internal server error'),
                }
            }
        },
        async (request, reply) => {

            const result = await getOriginalUrlByShortenedUrl({
                shortened_url: request.params.shortened_url
            });

            if (isRight(result)) {
                return reply.status(200).send(result.right)
            }

            const error = unwrapEither(result)

            switch (error.constructor.name) {
                case 'RecordNotFound':
                    return reply.status(404).send({ message: error.message })
            }
        }
    )
}