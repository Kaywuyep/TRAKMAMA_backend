const axios = require('axios');
const dotenv = require('dotenv');
const Payment = require('../models/payments');
const User = require('../models/usermodel');

dotenv.config();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API_BASE_URL = 'https://api.paystack.co';
const PLAN_CODE = process.env.PLAN_CODE;

const createCustomer = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await axios.post(`${PAYSTACK_API_BASE_URL}/customer`, { email }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
};

const initializePayment = async (req, res) => {
  const { email, amount } = req.body;

  // Ensure amount is a number greater than zero and an integer
  if (!amount || typeof amount !== 'number' || amount <= 0 || !Number.isInteger(amount)) {
    return res.status(400).json({
      error: {
        status: false,
        message: 'Invalid amount. It should be a number greater than zero, with no decimal places.',
        type: 'validation_error',
        code: 'invalid_amount'
      }
    });
  }

  try {
    const response = await axios.post(`${PAYSTACK_API_BASE_URL}/transaction/initialize`, {
      email: email,
      amount: amount * 100, // Convert to kobo if amount is in NGN
      plan: PLAN_CODE
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(201).json(response.data);
  } catch (error) {
    if (error.response) {
      console.error(`Error status: ${error.response.status}`);
      console.error(`Error data: ${JSON.stringify(error.response.data)}`);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ error: 'No response from server. Please try again later.' });
    } else {
      console.error('Error setting up request:', error.message);
      res.status(500).json({ error: 'An error occurred while setting up the request.' });
    }
  }
};



const createSubscription = async (req, res) => {
  const { customerCode, email, amount } = req.body;

  if (!customerCode || !email || !amount) {
    return res.status(400).json({
      error: 'Missing required fields: customerCode, email, and amount are required.'
    });
  }

  try {
    const response = await axios.post(`${PAYSTACK_API_BASE_URL}/subscription`, {
      customer: customerCode,
      plan: PLAN_CODE
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(201).json(response.data);
  } catch (error) {
    if (error.response) {
      console.error(`Error status: ${error.response.status}`);
      console.error(`Error data: ${JSON.stringify(error.response.data)}`);

      if (error.response.data && error.response.data.code === 'no_active_authorizations_for_customer') {
        try {
          // Initialize payment if customer has no saved authorizations
          const initResponse = await initializePayment(email, amount);

          res.status(400).json({
            error: 'The customer specified has no saved authorizations. Please complete the payment initialization process.',
            nextStep: initResponse.authorization_url // Provide the URL to the user to complete payment
          });
        } catch (initError) {
          res.status(500).json({ error: initError.message });
        }
      } else {
        switch (error.response.status) {
          case 400:
            res.status(400).json({ error: 'Bad Request: The request could not be understood or was missing required parameters.' });
            break;
          case 401:
            res.status(401).json({ error: 'Unauthorized: Authentication failed or user does not have permissions for the requested operation.' });
            break;
          case 404:
            res.status(404).json({ error: 'Not Found: The specified resource could not be found.' });
            break;
          case 500:
          default:
            res.status(500).json({ error: 'Internal Server Error: An error occurred on the server.' });
            break;
        }
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ error: 'No response from server. Please try again later.' });
    } else {
      console.error('Error setting up request:', error.message);
      res.status(500).json({ error: 'An error occurred while setting up the request.' });
    }
  }
};

const createPayment = async (req, res) => {
  const { paymentPlan, totalPrice, currency, paymentMethod } = req.body;
  const id = req.params.id

  try {
    // Find the user
    const user = await User.findById({ _id: id});
    if (!user) {
      throw new Error("User not found");
    }

    // Create payment record in DB
    const payment = await Payment.create({
      username: user._id,
      paymentPlan,
      totalPrice,
      currency,
      paymentMethod,
    });

    if (paymentMethod === "Paystack") {
      const response = await axios.post(`${PAYSTACK_API_BASE_URL}/transaction/initialize`, {
        email: user.email,
        amount: totalPrice * 100,
        currency,
      }, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      res.send({ url: response.data.data.authorization_url });
    } else {
      res.status(201).json({
        success: true,
        message: "Payment created successfully",
        payment,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
};

const getAllPaymentsCtrl = async (req, res) => {
  try {
    const payments = await Payment.find().populate("username");
    res.json({
      success: true,
      message: "All payments",
      payments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSinglePaymentCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findById(id).populate("username");
    res.status(200).json({
      success: true,
      message: "Single payment",
      payment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePaymentCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Payment updated",
      updatedPayment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentStatsCtrl = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $group: {
          _id: null,
          minimumSale: { $min: "$totalPrice" },
          totalSales: { $sum: "$totalPrice" },
          maxSale: { $max: "$totalPrice" },
          avgSale: { $avg: "$totalPrice" },
        },
      },
    ]);

    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const saleToday = await Payment.aggregate([
      {
        $match: {
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Sum of payments",
      payments,
      saleToday,
    });
  } catch (error) {
    res.status500().json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  initializePayment,
  createSubscription,
  createPayment,
  getAllPaymentsCtrl,
  getSinglePaymentCtrl,
  updatePaymentCtrl,
  getPaymentStatsCtrl,
};