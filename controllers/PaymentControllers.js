
const axios = require('axios');
var crypto = require('crypto');


/*** Create a new collection for products */
const handleWebhook = (req, res) => {
  console.log('hook : ', req.body);
  var crypto = require('crypto');
  var secret = process.env.SECRET_KEY;
// Using Express

    //validate event
    var hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    var event = req.body;
    // Do something with event  
    }
    res.send(200);
};


module.exports = {
  handleWebhook,
};