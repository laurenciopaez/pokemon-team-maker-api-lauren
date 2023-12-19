const { db } = require('../../firebase');
const { comparePassword, createJwtToken } = require('../../utils/helpers/authHelpers');

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usersCollectionRef = db.collection('users');
    const userQuerySnapshot = await usersCollectionRef.where('username', '==', username).get();

    if (userQuerySnapshot.empty) {
      return res.status(401).json({ message: 'No user with that username found' });
    }

    // Iterar sobre los documentos (debería ser solo uno)
    userQuerySnapshot.forEach((doc) => {

      const userData = doc.data();
      const userId = doc.id;

      console.log(userId)
      // Verifica la contraseña
      if (comparePassword(userData.password, password)) {

        const token = createJwtToken(userId, userData.email);
        console.log(token)
        
        return res.status(200).json({success: true, token, user: userData });
      } else {
        return res.status(401).json({success: false, message: 'Incorrect password' });
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = loginUser;