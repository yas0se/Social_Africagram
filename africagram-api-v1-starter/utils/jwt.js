const jwt = require('jsonwebtoken');

function generateToken(user) {
  try {
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );
    return token;
  } catch (error) {
    throw new Error('Erreur lors de la génération du token');
  } 
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token invalide');
  }
}

module.exports = {
  generateToken,
  verifyToken
};
