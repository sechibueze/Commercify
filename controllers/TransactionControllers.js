const axios = require('axios');
const { validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

/*** Create a new collection for products */
const initializeTransaction = (req, res) => {
  // Check for input validation errors
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  // Passed all validations
  // Get  fields
  const { email, amount } = req.body;

  const paymentData = { email, amount };
  const initializePaymentUrl = 'https://api.paystack.co/transaction/initialize';
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ process.env.PAYSTACK_SECRET_KEY }`
      }
    };

    axios.post(initializePaymentUrl, paymentData, config)
      .then(({ data }) => {
        // console.log('Paystack respons : ', data);
        const payUrl = data.data.authorization_url;
     
        return res.status(200).json({
          status: true,
          message: 'Initialized payment',
          data: data.data
        });
        
      })
      .catch(e => {
        return res.status(500).json({
          status: false,
          error: 'Could not initialize payment'

        });
      });
};

/*** Verify Transaction */
const verifyTransaction = (req, res) => {
  // Check for input validation errors
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  // Passed all validations
  // Get  fields
  const { reference } = req.body;

  const paystackVerificationUrl = `https://api.paystack.co/transaction/verify/${ reference }`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ process.env.PAYSTACK_SECRET_KEY }`
      }
    };

    axios.get(paystackVerificationUrl, config)
      .then(({ data }) => {
        
        if (data.data.status !== 'success') {
          return res.status(500).json({
            status: false,
            error: 'Could not verify payment'
          });
        }

        const { amount, currency } = data.data;
        const { first_name, last_name, email} = data.data.customer;

        let transactionData = { reference, amount, email};
        transactionData.firstname = first_name;
        transactionData.lastname = last_name;

        let newTransaction = new Transaction(transactionData);

        newTransaction.save(err => {

          return res.status(200).json({
            status: true,
            message: 'verified payment',
            data: newTransaction._id
          });
        })     
      })
      .catch(e => {
        return res.status(500).json({
          status: false,
          error: 'Could not verify payment'
        });
      });
};

module.exports = {
  initializeTransaction,
  verifyTransaction
};