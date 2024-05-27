const bcrypt = require('bcryptjs');

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Erreur lors de la comparaison des mots de passe');
  }
}

module.exports = comparePasswords;


