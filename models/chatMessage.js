/**
 * Mongoose schema definition for chat messages.
 * This schema is used to store chat messages in a MongoDB collection.
 */
const mongoose = require('mongoose');

/**
 * Schema for the ChatMessage collection.
 *
 * Fields:
 * - `room` (String, required): The identifier for the chat room where the message was sent.
 * - `userId` (String, required): The identifier of the user who sent the message.
 * - `message` (String, required): The content of the chat message.
 * - `timestamp` (Date, default: Date.now): The time when the message was sent. Defaults to the current time.
 */
const chatMessageSchema = new mongoose.Schema({
    room: { type: String, required: true },
    userId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

/**
 * Indexing:
 * - Indexes the `room` and `timestamp` fields to optimize queries for retrieving messages by room in chronological order.
 */
chatMessageSchema.index({ room: 1, timestamp: 1 });

/**
 * Export the ChatMessage model based on the defined schema.
 *
 * @module ChatMessage
 */
module.exports = mongoose.model('ChatMessage', chatMessageSchema);
