/**
 * Express routes for managing chat operations.
 * Provides endpoints for saving chat messages and retrieving chat history.
 */
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

/**
 * POST /save
 * Endpoint for saving a chat message to the database.
 *
 * Request Body:
 * - `room` (String): The identifier of the chat room.
 * - `userId` (String): The identifier of the user sending the message.
 * - `message` (String): The content of the chat message.
 *
 * Response:
 * - 201: Message saved successfully. Returns the saved message data.
 * - 500: Internal server error. Returns an error message if saving fails.
 */
router.post('/save', async (req, res) => {
    const { room, userId, message } = req.body;
    try {
        const response = await chatController.insert({ room, userId, message });
        res.status(201).json({ message: 'Message saved successfully', data: response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save chat message' });
    }
});

/**
 * GET /history/:room
 * Endpoint for retrieving the chat history of a specific room.
 *
 * Path Parameters:
 * - `room` (String): The identifier of the chat room.
 *
 * Response:
 * - 200: Successfully retrieves and returns the chat history as an array of messages.
 * - 500: Internal server error. Returns an error message if fetching fails.
 */
router.get('/history/:room', async (req, res) => {
    const { room } = req.params;
    try {
        const messages = await chatController.query({ room });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
});

/**
 * Exports the router for use in the main application.
 *
 * @module ChatRoutes
 */
module.exports = router;
