const Model = require('../models/chatMessage');

// Fonction pour insérer un message dans MongoDB
function insert(body) {
    return new Promise((resolve, reject) => {
        console.log(`[Chat Controller] Tentative de sauvegarde dans MongoDB avec les données :`, body);
        const mongoObj = new Model(body);

        mongoObj.save()
            .then(results => {
                console.log('[Chat Controller] Message sauvegardé avec succès dans MongoDB :', results);
                const resultWithVirtuals = results.toObject({ virtuals: true });
                resolve(resultWithVirtuals);
            })
            .catch(error => {
                console.error('[Chat Controller] Erreur lors de la sauvegarde dans MongoDB :', error);
                reject(error);
            });
    });
}


module.exports.insert = insert;

// Fonction pour récupérer les messages (historique) d'une room
function query(body) {
    return new Promise((resolve, reject) => {
        console.log(`[Chat Controller] Tentative de recherche dans MongoDB avec le corps :`, body);
        Model.find(body)
            .then(results => {
                if (results.length === 0) {
                    console.log(`[Chat Controller] Aucun message trouvé pour :`, body);
                } else {
                    console.log(`[Chat Controller] Messages récupérés :`, results);
                }
                const filteredResults = results.map(message => {
                    const obj = message.toObject({ virtuals: true });
                    return {
                        id: obj._id,
                        room: obj.room,
                        userId: obj.userId,
                        message: obj.message,
                        timestamp: obj.timestamp,
                    };
                });
                resolve(filteredResults);
            })
            .catch(error => {
                console.error(`[Chat Controller] Erreur lors de la recherche dans MongoDB :`, error);
                reject(error);
            });
    });
}


module.exports.query = query;
