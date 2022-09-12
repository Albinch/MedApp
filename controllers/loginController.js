const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const registerView = (req, res) => {
    res.render('register', {
    });
}

const registerUser = (req, res) => {
    const { last_name, first_name, email, password, confirm, promo } = req.body;
    if(!last_name || !first_name || !email || !password || !promo)
        console.log('Remplissez les champs vides.');

    if(password !== confirm){
        console.log('Les mots de passe ne correspondent pas.');
    }
    else{
        User.findOne({ email: email }).then((user) => {
            if(user){
                console.log('email exists.');
                res.render('register', {
                    last_name,
                    first_name,
                    email,
                    password,
                    confirm,
                });
            }else{
                const newUser = new User({
                    last_name,
                    first_name,
                    email,
                    password,
                    promo
                });
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(res.redirect('/login'))
                            .catch((err) => console.log(err));
                    })
                );
            }
        })
    }
}

const loginView = (req, res) => {
    res.render('login', {
    });
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Remplissez les champs vides.')
        res.render('login', {
            email,
            password,
        });
    } else {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res);
    }
};

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
};