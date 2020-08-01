const express = require('express');

const router = express.Router();

router.use('/users', (req, res) => {
  res.status(200).json({
    message: 'OK'
  })
})
module.exports = router;