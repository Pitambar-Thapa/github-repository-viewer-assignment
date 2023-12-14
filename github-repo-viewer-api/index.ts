import fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes/route';
import fastifyEnv from '@fastify/env';

const server = fastify();

server.register(cors, {
    // Your CORS configuration options go here
    origin: true, // Allows all origins. In the production, this should be filter only for specific request.
  });

// Register the fastify-env plugin
server.register(fastifyEnv, {
    dotenv: true,  // Load variables from .env file
    schema: {
      type: 'object',
      required: ['PORT'],
      properties: {
        PORT: { type: 'string', default: '8080' }, // Set a default value if not defined
      },
    },
  });

// Register routes here
routes.forEach((route:any, index:any) => {
    server.route(route)
});

// Server
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});