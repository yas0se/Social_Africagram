const jwt = require('jsonwebtoken');


const startSession = (req,res) => {
  try {

  const token = jwt.sign({ userId: req.user.id }, process.env.MY_SECRET, { expiresIn: '1h' });
  console.log("JWT Token generated:", token);
  return res.status(200).json({ accessToken:token, message: 'User logged in successfully' });
} catch (error) {
  console.error('Error logging in user:', error);
  res.status(500).json({ error: 'Internal server error' });
}
}

module.exports = startSession;
