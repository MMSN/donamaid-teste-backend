const mongoose = require('mongoose');
const orders = require('./orders');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    begin: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        ref: 'Addresses'
    },
    client: {
        type: String,
        required: true,
        ref: 'Clients'
    },
    professional: {
        type: String,
        required: true,
        ref: 'Professionals'
    }
}, { collection: 'orders', versionKey: false});

/*
ordersSchema.pre('save', function (next, req) {
    var Clients = mongoose.model('Clients');
    var Professionals = mongoose.model('Professionals');
    var Addresses = mongoose.model('Addresses'); //--> add this line
    //console.log(Clients);
    Clients.findOne({id:orders.client}, function (err, found) {
      if (!found) return next(new Error({error:"Cliente nao existente"}))});
    Professionals.findOne({id:orders.professional}, function (err, found) {
      if (!found) return next(new Error({error:"Profissional nao existente"}))});
    Addresses.findOne({id:orders.address}, function (err, found) {
      if (!found) return next(new Error({error:"Endereco nao existente"}))});
    return next();

      //if (found) return next();
      //else return next(new Error({error:"not found"}));
    });
*/

module.exports = mongoose.model('Orders', ordersSchema);