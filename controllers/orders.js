const mongoose = require('mongoose');
const Orders = require('../models/orders');

/*
exports.getOrders = (req, res, next) => {
    res.status(200).json({
        orders: [{title: 'im fucked', content: 'help me'}]
    });
}

exports.postOrders = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Ordem criada com sucesso!',
        post: { id: new Date().toISOString(), title: title, content: content } 
    })
}
*/

exports.getOrders = (req, res, next) => {
    //console.log('orda');

    Orders.find().select('-_id')
    .then(orders => {
        res
            .status(200)
            .json({message: 'Ordens encontradas com sucesso.', orders: orders});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getOrder = (req, res, next) => {
    //console.log('xdr');
    const orderId = req.params.orderId;
    //if (mongoose.Types.ObjectId.isValid(postId)) {
        //Addresses.findById(postId)
    Orders.find({ id: orderId}).select('-_id')
        .then(order => {
            //if (order.length == 0) { //se utilizar o find, ele retorna positivo mesmo com 0, entao usar length
                if (order.length == 0) {
                const error = new Error('Ordem nao encontrada!');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Ordem encontrada!', order: order});
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

exports.postOrders = async (req, res, next) => {
    //console.log('fear');
    //console.log(req);
    const id = req.body.id;
    //console.log(id);
    const begin = req.body.begin;
    const duration = req.body.duration;
    const address = req.body.address;
    const client = req.body.client;
    const professional = req.body.professional;
    var sum = 0;
    var msg = '';

    var Clients = mongoose.model('Clients');
    var Professionals = mongoose.model('Professionals');
    var Addresses = mongoose.model('Addresses'); 
    
    const eclient = await Clients.findOne({id:client}, function (err, found) {
        //console.log(found);
        if (!found) {
            //return next(new Error({error:"Cliente nao existente."}));
            msg = msg + 'ID do cliente nao existente.';
        }
        else {
            sum = sum + 1;
        }
    });
    const eprofessional = await Professionals.findOne({id:professional}, function (err, found) {
        //console.log(found);
        if (!found) {
            //return next(new Error({error:"Professional nao existente."}));
            msg = msg + ' ID do profissional nao existente.';
        }
        else {
            sum = sum + 1;
        }
    });
    const eaddress = await Addresses.findOne({id:address}, function (err, found) {
        //console.log(found);
        if (!found) {
            //return next(new Error({error:"Endereco nao existente."}));
            msg = msg + ' ID do endereco nao existente.';
        }
        else {
            sum = sum + 1;
        }
    });
    //console.log("bat"+sum);
    if (sum == 3) {
        const order = new Orders({
            id: id,
            begin: begin,
            duration: duration,
            address: address,
            client: client,
            professional: professional
        });
        //console.log("orders");
        order
            .save()
            .then(result => {
                //console.log(result);
                res.status(201).json({
                    message: "Ordem adicionada com sucesso!",
                    address: result
                });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }
    else {
        //console.log(msg);
        res.status(404).json({
            message: msg
        })
    }
};

exports.updateOrder = async (req, res, next) => {
    //console.log('fin');
    const orderId = req.params.orderId;
    
    const begin = req.body.begin;
    const duration = req.body.duration;
    const address = req.body.address;
    const client = req.body.client;
    const professional = req.body.professional;

    var sum = 0;
    var msg = '';

    var Clients = mongoose.model('Clients');
    var Professionals = mongoose.model('Professionals');
    var Addresses = mongoose.model('Addresses'); 
    
    const eclient = await Clients.findOne({id:client}, function (err, found) {
        //console.log(found);
        if (!found) {
            //return next(new Error({error:"Cliente nao existente."}));
            msg = msg + 'Cliente nao existente.';
        }
        else {
            sum = sum + 1;
        }
    });
    const eprofessional = await Professionals.findOne({id:professional}, function (err, found) {
        //console.log(found);
        if (!found) {
            //return next(new Error({error:"Professional nao existente."}));
            msg = msg + ' Profissional nao existente.';
        }
        else {
            sum = sum + 1;
        }
    });
    const eaddress = await Addresses.findOne({id:address}, function (err, found) {
        //console.log(found);
        if (!found) {
            //return next(new Error({error:"Endereco nao existente."}));
            msg = msg + ' Endereco nao existente.';
        }
        else {
            sum = sum + 1;
        }
    });
    //console.log("ast "+sum);
    if (sum == 3) {
        Orders.findOne({id: orderId})
        .then(order => {
            if (!order) {
                const error = new Error('ID de ordem nao encontrada!');
                error.statusCode = 404;
                throw error;
            }
            
            //console.log(order);
            order.begin = begin,
            order.duration = duration,
            order.address = address,
            order.client = client,
            order.professional = professional
            return order.save();
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
    else {
        //console.log(msg);
        res.status(404).json({
            message: msg
        })
    }

}

exports.deleteOrder = (req, res, next) => {
    //console.log('alm');
    const orderId = req.params.orderId;
    Orders.findOne({id: orderId})
        .then(order => {
            if (!order) {
                const error = new Error('ID de ordem nao encontrada!');
                error.statusCode = 404;
                throw error;
            }
            return order.remove();
        })
        .then(result => {
            //console.log(result);
            res.status(200).json({message: 'Ordem removida.'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })    
}