const mongoose = require('mongoose');
const Professionals = require('../models/professionals');

exports.getProfessionals = (req, res, next) => {
    //console.log('zoe');

    Professionals.find().select('-_id')
    .then(professionals => {
        res
            .status(200)
            .json({message: 'Profissionais encontrados com sucesso.', professionals: professionals});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.getProfessional = (req, res, next) => {
    //console.log('maria');
    const postId = req.params.professionalsId;
    //if (mongoose.Types.ObjectId.isValid(postId)) {
        //Professionals.findById(postId)
    //Professionals.find({ id: postId })
    Professionals.findOne({id: postId}).select('-_id')
        .then(professional => {
            if (!professional) {
                const error = new Error('ID de profissional nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Profissional encontrado!', professional: professional});
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

exports.postProfessional = (req, res, next) => {
    //onsole.log('STM');
    //console.log(req);
    const id = req.body.id;
    //console.log(id);
    const cpf = req.body.cpf;
    const name = req.body.name;
    const email = req.body.email;
    const professional = new Professionals({
        id: id,
        cpf: cpf,
        name: name,
        email: email
    });
    //console.log(professional);
    professional
        .save()
        .then(result => {
            //console.log(result);
            res.status(201).json({
                message: "Profissional adicionado com sucesso!",
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

exports.updateProfessional = (req, res, next) => {
    //console.log('TSM');
    const professionalId = req.params.professionalsId;
    const cpf = req.body.cpf;
    const name = req.body.name;
    const email = req.body.email;
    Professionals.findOne({id: professionalId})
        .then(professional => {
            if (!professional) {
                const error = new Error('ID de profissional nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            //console.log(professional);
            professional.cpf = cpf;
            professional.name = name;
            professional.email = email;
            return professional.save();
        })
        .then(result => {
            res.status(200).json({message: 'Profissional atualizado com sucesso!', professional: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteProfessional = (req, res, next) => {
    //console.log('del');
    const professionalId = req.params.professionalsId;
    Professionals.findOne({id: professionalId})
        .then(professional => {
            if (!professional) {
                const error = new Error('ID de profissional nao encontrado!');
                error.statusCode = 404;
                throw error;
            }
            return professional.remove()
        })
        .then(result => {
            //console.log(result);
            res.status(200).json({message: 'Profissional removido com sucesso.'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })    
}