const Model = require('../models/chatMessage');

// Function for inserting a message in MongoDB
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

module.exports.insert = insert;


// Function to retrieve messages (history) from a room
function query(body) {
    return new Promise((resolve, reject) => {
        console.log(`[Chat Controller] Attempting to search in MongoDB with body:`, body);
        Model.find(body)
            .then(results => {
                if (results.length === 0) {
                    console.log(`[Chat Controller] No messages found for:`, body);
                } else {
                    console.log(`[Chat Controller] Messages retrieved:`, results);
                }
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


module.exports.query = query;
