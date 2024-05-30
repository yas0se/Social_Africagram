const jwt = require('jsonwebtoken');
const startSession = (req, res,next) => {
  console.log("starting session")
  try {
    const token = jwt.sign({ userId: req.user.id }, process.env.MY_SECRET, { expiresIn: '1h' });
    console.log("JWT Token generated:", token);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.json({ accessToken: token, message: 'User logged in successfully' });
    next()
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  
module.exports = {startSession};
