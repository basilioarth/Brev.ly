import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { exportUrls } from '../../../app/functions/export-urls.ts';
import { isRight, unwrapEither } from '../../../shared/either.ts';

export const exportUrlsRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/urls/exports',
        {
            schema: {
                summary: 'Export all urls',
                response: {
                    200: z.object({ 
                        reportUrl: z.string() 
                    }).describe('Urls exported successfully'),
                    500: z.object({
                        message: z.string()
                    }).describe('Internal server error'),
                }
            },
        },
        async (request, reply) => {

            const result = await exportUrls();

            if (isRight(result)) {
                return reply.status(200).send({ reportUrl: result.right.reportUrl })
            }

            const error = unwrapEither(result)

            return reply.status(500).send({ message: error.message })
        }
    )
}