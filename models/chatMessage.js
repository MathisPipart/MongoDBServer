const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    room: { type: String, required: true }, // Room ID
    userId: { type: String, required: true }, // ID de l'utilisateur
    message: { type: String, required: true }, // Texte du message
    timestamp: { type: Date, default: Date.now } // Horodatage
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
