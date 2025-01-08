const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    room: { type: String, required: true },
    userId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

chatMessageSchema.index({ room: 1, timestamp: 1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
