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

module.exports = {
    dashboardView,
};