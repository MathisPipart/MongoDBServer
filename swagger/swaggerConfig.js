const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MongoDB Chat API",
            version: "1.0.0",
            description: "API pour la gestion des messages et des chats avec MongoDB",
        },
        servers: [
            {
                url: "http://localhost:3000", // URL de ton serveur
            },
        ],
    },
    apis: ["./routes/chatRoutes.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
