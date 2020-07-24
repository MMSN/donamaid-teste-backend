const mongoose = require('mongoose');
const Clients = require('../models/clients')

exports.getClients = (req, res, next) => {
    //console.log('mateus');

    //remover os _id: .select('-_id') (apos o find())
    Clients.find().select('-_id')
    .then(clients => {
        res
            .status(200)
            .json({message: 'Clientes encontrados com sucesso.', clients: clients});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getClient = (req, res, next) => {
    //console.log('metus');
    const postId = req.params.clientId;
    //if (mongoose.Types.ObjectId.isValid(postId)) {
        //Clients.findById()
    Clients.findOne({id: postId}).select('-_id')
        .then(client => {
            if (!client) {
                const error = new Error('ID de cliente nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            //console.log("Encontrado"+client);
            res.status(200).json({message: 'Cliente encontrado!', client: client});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    //}
    //else {
    //    res.status(404).json({message: 'ID entrado nao e valido!'});
    //}
};

exports.postClient = (req, res, next) => {
    //console.log('MTS');
    //console.log(req);
    const id = req.body.id;
    //console.log(id);
    const cpf = req.body.cpf;
    const name = req.body.name;
    const email = req.body.email;
    const client = new Clients({
        id: id,
        cpf: cpf,
        name: name,
        email: email
    });
    //console.log(client);
    client
        .save()
        .then(result => {
            //console.log("Adicionado"+result);
            res.status(201).json({
                message: "Cliente adicionado com sucesso!",
                client: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateClient = (req, res, next) => {
    //console.log('TSM');
    const clientId = req.params.clientId;
    const cpf = req.body.cpf;
    const name = req.body.name;
    const email = req.body.email;
    Clients.findOne({id: clientId})
        .then(client => {
            if (!client) {
                const error = new Error('ID de cliente nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            //console.log(client);
            client.cpf = cpf;
            client.name = name;
            client.email = email;
            return client.save();
        })
        .then(result => {
            //console.log("Atualizado"+result)
            res.status(200).json({message: 'Cliente atualizado com sucesso!', cliente: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteClient = (req, res, next) => {
    //console.log('del');
    const clientId = req.params.clientId;
    Clients.findOne({id: clientId})
        .then(client => {
            if (!client) {
                const error = new Error('ID de cliente nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            return client.remove()
        })
        .then(result => {
            //console.log("Removido"+result);
            res.status(200).json({message: 'Cliente removido.'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}