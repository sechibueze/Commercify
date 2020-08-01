

/*** Handle User sign up request */
const signup = (req, res) => {
  return res.status(200).json({
    message: 'Handling user signup'
  });
};

module.exports = {
  signup
};