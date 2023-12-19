// Verifica usuarios duplicados
const userAlreadyExistsMiddleware = async (req, res, next) => {
    const { email } = req.body;
  
    // Verificar si el usuario ya existe en Firestore
    const query = db.collection("users").where("profile.email", "==", email);
    const querySnapshot = await query.get();
  
    if (!querySnapshot.empty) {
      return res.status(400).json({ error: "User already exists" });
    }
  
    return next();
  };
  
  module.exports = {
    userAlreadyExistsMiddleware,
  };