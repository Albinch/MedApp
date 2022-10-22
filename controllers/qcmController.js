const { nextTick } = require('vue');
const QCM = require('../models/QCM');

const getAll = (req, res) => {
    QCM.find({}, function(err, qcms){
        return qcms;
    });
};

const getGoodResponsesPercentage = (req, res, next) => {
    QCM.find({}, function(err, qcms){
        let goodReponses = 0;
        let totalReponses = 0;
        for(let qcm in qcms){
            goodReponses += qcms[qcm].score;
            totalReponses += qcms[qcm].nb_questions;
        }
        res.status(200).send('' + goodReponses / totalReponses);
        next();
    });
}

const getWeaknesses = (req, res) => {
    QCM.find({}, function(err, qcms){
        let goodReponses = 0;
        let totalReponses = 0;
        let subjects = [];
        for(let qcm in qcms){
            goodReponses += qcms[qcm].score;
            totalReponses += qcms[qcm].nb_questions;
            subjects.push({
                "subject": qcms[qcm].subject,
                "ratio": goodReponses / totalReponses
            });
        }
        subjects.sort((a, b) => a.ratio - b.ratio);
        res.status(200).send(subjects.slice(0, 3));
    });
}

module.exports = {
    getAll,
    getGoodResponsesPercentage,
    getWeaknesses
}