const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');


router.post('/save', async (req, res) => {
    const { room, userId, message } = req.body;
    try {
        const response = await chatController.insert({ room, userId, message });
        res.status(201).json({ message: 'Message saved successfully', data: response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save chat message' });
    }
});


router.get('/history/:room', async (req, res) => {
    const { room } = req.params;
    try {
        const messages = await chatController.query({ room });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
});



module.exports = router;
