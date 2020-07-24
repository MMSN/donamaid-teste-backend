const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalsSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { collection: 'professionals', versionKey: false});

module.exports = mongoose.model('Professionals', professionalsSchema);