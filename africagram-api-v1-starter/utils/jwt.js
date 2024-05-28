<<<<<<< Updated upstream
=======
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If no token is provided, return a 401 Unauthorized error
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.MY_SECRET, (err, user) => {
    if (err) {
      console.error('Failed to authenticate token:', err);
      // If the token is invalid, return a 403 Forbidden error
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    // If the token is valid, attach the user object to the request
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
>>>>>>> Stashed changes
