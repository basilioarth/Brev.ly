import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { createShortenedUrl } from '../../../../src/app/functions/create-shortened-url.ts';
import { isRight, unwrapEither } from '../../../shared/either.ts';

export const createShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/urls',
        {
            schema: {
                summary: 'Create a shortened url',
                body: z.object({
                    original_url: z.string().url().nonempty(),
                    shortened_url: z.string().nonempty(),
                }),
                response: {
                    201: z.object({
                        id: z.string().uuid().describe('New url ID'),
                        originalUrl: z.string().url().describe('New original url'),
                        shortenedUrl: z.string().describe('New shortened url'),
                        accessCount: z.number().describe('New access count'),
                        createdAt: z.string().describe('New creation date')
                    }).describe('Url created'),
                    400: z.object({
                        message: z.string()
                    }).describe('Validation error'),
                    409: z.object({
                        message: z.string()
                    }).describe('Duplicate shortened url'),
                    422: z.object({
                        message: z.string()
                    }).describe('Badly formatted shortened url'),
                    500: z.object({
                        message: z.string()
                    }).describe('Internal server error'),
                }
            }
        },
        async (request, reply) => {

            const result = await createShortenedUrl({
                original_url: request.body.original_url,
                shortened_url: request.body.shortened_url
            });
    
            if (isRight(result)) {
                return reply.status(201).send({ 
                    id: result.right.id,
                    originalUrl: result.right.originalUrl,
                    shortenedUrl: result.right.shortenedUrl,
                    accessCount: result.right.accessCount,
                    createdAt: result.right.createdAt.toISOString()
                })
            }
    
            const error = unwrapEither(result)
    
            switch (error.constructor.name) {
                case 'BadlyFormattedShortenedURL':
                    return reply.status(422).send({ message: error.message })
                case 'ShortenedURLAlreadyExists':
                    return reply.status(409).send({ message: error.message })
            }
        }
    )
}