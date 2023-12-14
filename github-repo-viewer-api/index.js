"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const route_1 = require("./routes/route");
const env_1 = __importDefault(require("@fastify/env"));
const server = (0, fastify_1.default)();
server.register(cors_1.default, {
    // Your CORS configuration options go here
    origin: true, // Allows all origins. In the production, this should be filter only for specific request.
});
// Register the fastify-env plugin
server.register(env_1.default, {
    dotenv: true, // Load variables from .env file
    schema: {
        type: 'object',
        required: ['PORT'],
        properties: {
            PORT: { type: 'string', default: '8080' }, // Set a default value if not defined
        },
    },
});
// Register routes here
route_1.routes.forEach((route, index) => {
    server.route(route);
});
// Server
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
