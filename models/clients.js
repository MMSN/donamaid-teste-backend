const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientsSchema = new Schema({
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
}, { collection: 'clients', versionKey: false});

module.exports = mongoose.model('Clients', clientsSchema);