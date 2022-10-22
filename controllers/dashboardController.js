const Subject = require('../models/Subject');
const QCM = require('../models/QCM');

const dashboardView = (req, res) => {
    Subject.find({}, function(err, subjects){
        QCM.find({}, function(err, qcms){
            res.render('dashboard', {
                user: req.user,
                subjects: subjects,
                qcms: qcms
            });
        });
    });
};

const addQCM = (req, res) => {
    const { subject, year, score, nb_questions } = req.body;
    if(!subject || !year || !score || !nb_questions){
        console.log('Remplir les champs vides.');
    }else{
        const newQCM = new QCM({
            subject,
            year,
            score,
            nb_questions
        });
        newQCM.save()
            .then(res.redirect('/dashboard'))
            .catch((err) => console.log(err));
    }
}

module.exports = {
    dashboardView,
    addQCM
};