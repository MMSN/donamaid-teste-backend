const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressesSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    complemento: {
        type: String
    },
    cep: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    }
}, { collection: 'addresses', versionKey: false});

module.exports = mongoose.model('Addresses', addressesSchema);