const mongoose = require('mongoose');
const Addresses = require('../models/addresses');

exports.getAddresses = (req, res, next) => {
    //console.log('hercules');

    Addresses.find().select('-_id')
    .then(addresses => {
        res
            .status(200)
            .json({message: 'Enderecos encontrados com sucesso.', addresses: addresses});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getAddress = (req, res, next) => {
    //console.log('zeus');
    const postId = req.params.addressId;
    //if (mongoose.Types.ObjectId.isValid(postId)) {
        //Addresses.findById(postId)
    //Addresses.find({ id: postId})
    Addresses.findOne({id: postId}).select('-_id')
        .then(address => {
            if (!address) {
                const error = new Error('ID de endereco nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Endereco encontrado!', address: address});
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

exports.postAddress = (req, res, next) => {
    //console.log('athe');
    //console.log(req);
    const id = req.body.id;
    //console.log(id);
    const rua = req.body.rua;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const pais = req.body.pais;
    const address = new Addresses({
        id: id,
        rua: rua,
        numero: numero,
        complemento: complemento,
        cep: cep,
        cidade: cidade,
        estado: estado,
        pais: pais,
    });
    //console.log(professional);
    address
        .save()
        .then(result => {
            //console.log(result);
            res.status(201).json({
                message: "Endereco adicionado com sucesso!",
                address: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateAddress = (req, res, next) => {
    //console.log('had');
    const addressId = req.params.addressId;
    const rua = req.body.rua;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const cep = req.body.cep;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const pais = req.body.pais;
    Addresses.findOne({id: addressId})
        .then(address => {
            if (!address) {
                const error = new Error('ID de endereco nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            //console.log(address);
            address.rua = rua;
            address.numero = numero;
            address.complemento = complemento;
            address.cep = cep;
            address.cidade = cidade;
            address.estado = estado;
            address.pais = pais;
            return address.save();
        })
        .then(result => {
            res.status(200).json({message: 'Endereco atualizado com sucesso!', endereco: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteAddress = (req, res, next) => {
    //console.log('end');
    const addressId = req.params.addressId;
    Addresses.findOne({id: addressId})
        .then(address => {
            if (!address) {
                const error = new Error('ID de endereco nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            return address.remove()
        })
        .then(result => {
            //console.log(result);
            res.status(200).json({message: 'Endereco removido.'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })    
}