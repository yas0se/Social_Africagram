const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const comparePassword = async (req, res, next) => {
  try {
    // Check if the password is present in the request body
    if (!req.body.password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Find the user by email
    const user = await prisma.utilisateur.findUnique({
      where: { email: req.body.email }
    });

    // If no user is found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    // If the passwords match, attach the user object to the request
    if (isMatch) {
      req.user = user;
      next();
    } else {
      // Passwords do not match, return an error
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error comparing passwords:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = comparePassword;
