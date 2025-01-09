/**
 * Module for configuring Swagger documentation for the MongoDB Chat API.
 * Provides an OpenAPI 3.0 specification for API documentation and serves it through Swagger UI.
 */
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * Swagger configuration options.
 * Defines the API metadata and specifies the API routes to document.
 */
const options = {
    definition: {
        openapi: "3.0.0", // OpenAPI version
        info: {
            title: "MongoDB Chat API", // Title of the API
            version: "1.0.0", // API version
            description: "API pour la gestion des messages et des chats avec MongoDB", // Short description
        },
        servers: [
            {
                url: "http://localhost:3001", // Base URL for the API
            },
        ],
    },
    apis: ["./routes/chatRoutes.js"], // Path to files containing API annotations
};

/**
 * Generates the Swagger documentation based on the provided options.
 */
const swaggerSpec = swaggerJsDoc(options);

/**
 * Exports the Swagger UI middleware and the Swagger specification.
 *
 * @module SwaggerConfig
 * @property {Object} swaggerUi - Middleware for serving the Swagger UI.
 * @property {Object} swaggerSpec - Generated Swagger documentation.
 */
module.exports = { swaggerUi, swaggerSpec };
