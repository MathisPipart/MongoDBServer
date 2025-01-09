/**
 * MongoDB configuration and connection setup.
 */
const mongoose = require('mongoose');

/**
 * The MongoDB connection string for the database.
 * Ensure the MongoDB server is running before attempting to connect.
 */
const mongoDB = 'mongodb://localhost:27017/chatDB';

// Set mongoose to use global Promise implementation
mongoose.Promise = global.Promise;

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * @returns {Promise} Resolves if the connection is successful, otherwise logs an error.
 */
connection = mongoose.connect(mongoDB, {
    useNewUrlParser: true, // Use the new URL parser for MongoDB connection strings
    useUnifiedTopology: true, // Use the unified topology engine for MongoDB
    checkServerIdentity: false, // Skip server identity checks
})
    .then(() => {
            console.log('connection to mongodb worked!');
    })
    .catch((error) => {
        console.log('connection to mongodb did not work! ' + JSON.stringify(error));
    });
