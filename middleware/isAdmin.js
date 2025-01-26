const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role==='Admin') {
        
        return next();
    }
    console.log(req.session.user.role)
    res.status(403).send('Access denied. Admins only.');
};

module.exports = isAdmin;