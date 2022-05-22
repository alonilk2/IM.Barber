var router = require('express').Router();


router.use('/', require('./api/users'));
router.use('/', require('./api/products'));
router.use('/', require('./api/category'));
router.use('/', require('./api/orders'));
router.use('/', require('./api/coupons'));


module.exports = router;
