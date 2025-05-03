import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { 
    serializerCompiler, 
    validatorCompiler, 
    hasZodFastifySchemaValidationErrors,
    jsonSchemaTransform,
} from "fastify-type-provider-zod";
import scalarUI  from "@scalar/fastify-api-reference";
import { createUrlRoute } from "./routes/create-url.ts";
import { deleteUrlRoute } from "./routes/delete-url.ts";
import { getOriginalUrlByShortenedUrlRoute } from "./routes/get-original-url-by-shortened-url.ts";
import { getAllUrlsRoute } from "./routes/get-all-urls.ts";
import { incrementUrlAccessCountRoute } from "./routes/increment-url-access-count.ts";
import { exportUrlsRoute } from "./routes/export-urls.ts";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
        return reply.status(400).send({
            message: 'Validation error.',
            issues: error.validation,
        })
    }

    console.error(error)

    return reply.status(500).send({
        message: 'Internal server error.',
    }) 
});

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
});

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Documentação da API de encurtamento de URLs",
            version: "1.0.0"
        },
    },
    transform: jsonSchemaTransform
});

app.get('/openapi.json', () => app.swagger());

app.register(scalarUI, {
    routePrefix: '/docs',
    configuration: {
        layout: 'modern',
    }
});

app.register(createUrlRoute);
app.register(getAllUrlsRoute);
app.register(getOriginalUrlByShortenedUrlRoute);
app.register(incrementUrlAccessCountRoute);
app.register(deleteUrlRoute);
app.register(exportUrlsRoute);

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log(`HTTP server running! Go to http://localhost:3333/docs to view the documentation`)
});