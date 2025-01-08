const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

/**
 * @swagger
 * /chat/save:
 *   post:
 *     summary: Save a new chat message in MongoDB
 *     description: This endpoint saves a new chat message into the MongoDB database. It uses the `insert` function from the chatController to perform the operation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room:
 *                 type: string
 *                 description: The id of the chat room.
 *                 example: "1000864"
 *               userId:
 *                 type: string
 *                 description: The name of the user sending the message.
 *                 example: "Mathis"
 *               message:
 *                 type: string
 *                 description: The content of the chat message.
 *                 example: "Hello, this film is amazing"
 *     responses:
 *       201:
 *         description: The message was successfully saved in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message saved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     room:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     message:
 *                       type: string
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Failed to save the message in the database.
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
 * @swagger
 * /chat/history/{room}:
 *   get:
 *     summary: Retrieve chat history for a specific room
 *     description: This endpoint fetches the message history for a given chat room from MongoDB. It uses the `query` function from the chatController to retrieve the data.
 *     parameters:
 *       - in: path
 *         name: room
 *         required: true
 *         schema:
 *           type: string
 *           example: "1000864"  # Maintien de ta valeur
 *         description: The name of the chat room to retrieve messages for.
 *     responses:
 *       200:
 *         description: Successfully retrieved the chat history.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   room:
 *                     type: string
 *                     example: "1000864"  # Maintien de ta valeur
 *                     description: The id of the chat room.
 *                   userId:
 *                     type: string
 *                     example: "Mathis"  # Maintien de ta valeur
 *                     description: The name of the user who sent the message.
 *                   message:
 *                     type: string
 *                     example: "hello, this film is amazing"  # Maintien de ta valeur
 *                     description: The content of the message.
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-08T15:23:45.123Z"  # Maintien de ta valeur
 *       500:
 *         description: Failed to retrieve the chat history from the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch chat history"  # Maintien de ta valeur
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



module.exports = router;
