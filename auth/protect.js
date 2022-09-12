const protectRoute = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    console.log('Vous devez vous connecter pour continuer.');
    res.redirect('/login');
}

module.exports = {
    protectRoute,
};