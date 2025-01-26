const isAuthor = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'author' || 'Admin' ) {
        return next();
    }
    console.log(req.session.user.role)
    res.status(403).send('Access denied. Author only.');
};

module.exports = isAuthor;