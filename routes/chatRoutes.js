const express = require('express');
const router = express.Router();
const axios = require('axios');
const chatController = require('../controllers/chatController');


// Route to save a message in MongoDB
router.post('/save', async (req, res) => {
    const { room, userId, message } = req.body;
    console.log(`[Chat Routes] Saving message: Room: ${room}, User: ${userId}, Message: ${message}`);

    try {
        const response = await chatController.insert({ room, userId, message });
        console.log('[Chat Routes] Message successfully saved in MongoDB.');
        res.status(201).json({ message: 'Message saved successfully', data: response });
    } catch (error) {
        console.error('[Chat Routes] Error while saving the message:', error.message);
        res.status(500).json({ error: 'Failed to save chat message' });
    }
});


// Route to retrieve a room's history from MongoDB
router.get('/history/:room', async (req, res) => {
    const { room } = req.params;
    console.log(`[Chat Routes] Attempting to retrieve history for room: ${room}`);

    try {
        const messages = await chatController.query({ room });
        if (messages.length === 0) {
            console.log(`[Chat Routes] No messages found for room: ${room}`);
        }
        res.status(200).json(messages); // Return an empty list if no message
    } catch (error) {
        console.error(`[Chat Routes] Error while retrieving history: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
});


module.exports = router;
