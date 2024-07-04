const express = require('express');
const {
    createCustomer,
    initializePayment,
    createSubscription,
    createPayment,
    getAllPaymentsCtrl,
    getSinglePaymentCtrl,
    updatePaymentCtrl,
    getPaymentStatsCtrl,
} = require('../controllers/PaystackController');
const protect = require('../middlewares/protect');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');


const payRouter = express.Router();

payRouter.post('/createCustomer', protect, isLoggedIn, createCustomer);
payRouter.post('/initializePayment', protect, isLoggedIn, initializePayment);
payRouter.post('/createSubscription', protect, isLoggedIn, createSubscription);
payRouter.post('/create-payment/:id', protect, isLoggedIn, createPayment);
payRouter.get('/payments', protect, isLoggedIn, getAllPaymentsCtrl);
payRouter.get('/payments/:id', protect, isLoggedIn, getSinglePaymentCtrl);
payRouter.put('/payments/update/:id', protect, isAdmin, updatePaymentCtrl);
payRouter.get('/payments/sales/sum', protect, isAdmin, getPaymentStatsCtrl);

module.exports = payRouter;