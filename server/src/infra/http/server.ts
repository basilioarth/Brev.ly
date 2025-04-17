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
import { createShortenedUrlRoute } from "./routes/create-shortened-url.ts";
import { deleteShortenedUrlRoute } from "./routes/delete-shortened-url.ts";
import { getOriginalUrlByShortenedUrlRoute } from "./routes/get-original-url-by-shortened-url.ts";

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

app.register(createShortenedUrlRoute);
app.register(deleteShortenedUrlRoute);
app.register(getOriginalUrlByShortenedUrlRoute);

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log(`HTTP server running! Go to http://localhost:3333/docs to view the documentation`)
});