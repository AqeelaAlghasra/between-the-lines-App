const isCustomer = (req, res, next) => {
    const { orderId } = req.params;
    const userId = req.session.user._id;
    
    if (req.session.user && req.session.user.role === 'customer') {
        return next();
    }
    
    // Order.findById(orderId)
    //     .then(order => {
    //         if (order && order.orderItems.some(book => book.customer._id.toString() === userId)) {
    //             return next();
    //         }
    //         res.status(403).send('Access denied.');
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(500).send('Internal Server Error');
    //     });
};
module.exports = isCustomer;