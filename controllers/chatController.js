/**
 * Module dependencies.
 */
const Model = require('../models/chatMessage');

/**
 * Inserts a chat message into the MongoDB database.
 *
 * @param {Object} body - The chat message data to be saved.
 * @returns {Promise<Object>} A promise that resolves to the saved chat message with virtual fields included.
 */
function insert(body) {
    return new Promise((resolve, reject) => {
        console.log(`[Chat Controller] Attempting to save in MongoDB with data:`, body);
        const mongoObj = new Model(body);

        mongoObj.save()
            .then(results => {
                console.log('[Chat Controller] Message successfully saved in MongoDB:', results);
                const resultWithVirtuals = results.toObject({ virtuals: true });
                resolve(resultWithVirtuals);
            })
            .catch(error => {
                console.error('[Chat Controller] Error while saving in MongoDB:', error);
                reject(error);
            });
    });
}

/**
 * Retrieves all chat messages for a specific room, sorted chronologically.
 *
 * @param {Object} body - The query criteria, typically including the room identifier.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of chat messages,
 * each containing room, userId, message, and timestamp fields.
 */
function query(body) {
    return new Promise((resolve, reject) => {
        console.log(`[Chat Controller] Attempting to search in MongoDB with body:`, body);

        Model.find(body)
            .sort({ timestamp: 1 }) // Sort messages chronologically
            .then(results => {
                if (results.length === 0) {
                    console.log(`[Chat Controller] No messages found for:`, body);
                } else {
                    console.log(`[Chat Controller] Messages retrieved:`, results.length);
                }

                // Map results to include only relevant fields
                const filteredResults = results.map(message => {
                    const obj = message.toObject({ virtuals: true });
                    return {
                        room: obj.room,
                        userId: obj.userId,
                        message: obj.message,
                        timestamp: obj.timestamp,
                    };
                });

                resolve(filteredResults);
            })
            .catch(error => {
                console.error(`[Chat Controller] Error while searching in MongoDB:`, error);
                reject(error);
            });
    });
}

/**
 * Exports the functions for external use.
 */
module.exports = {
    insert,
    query,
};
