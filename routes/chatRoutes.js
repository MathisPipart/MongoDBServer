const express = require('express');
const router = express.Router();
const axios = require('axios');
const chatController = require('../controllers/chatController');


// Route to save a message in MongoDB
router.post('/save', async (req, res) => {
    const { room, userId, message } = req.body;
    console.log(`[Chat Routes] Sauvegarde du message : Room: ${room}, User: ${userId}, Message: ${message}`);

    try {
        const response = await chatController.insert({ room, userId, message });
        console.log('[Chat Routes] Message sauvegardé avec succès dans MongoDB.');
        res.status(201).json({ message: 'Message saved successfully', data: response });
    } catch (error) {
        console.error('[Chat Routes] Erreur lors de la sauvegarde du message :', error.message);
        res.status(500).json({ error: 'Failed to save chat message' });
    }
});


// Route to retrieve a room's history from MongoDB
router.get('/history/:room', async (req, res) => {
    const { room } = req.params;
    console.log(`[Chat Routes] Tentative de récupération de l'historique pour la room : ${room}`);

    try {
        const messages = await chatController.query({ room });
        if (messages.length === 0) {
            console.log(`[Chat Routes] Aucun message trouvé pour la room : ${room}`);
        }
        res.status(200).json(messages); // Return an empty list if no message
    } catch (error) {
        console.error(`[Chat Routes] Erreur lors de la récupération de l'historique : ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
});


module.exports = router;
