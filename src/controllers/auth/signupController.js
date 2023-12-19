const {db} = require("../../firebase");
//seguridad de contraseña
const { hashPassword } = require("../../utils/helpers/authHelpers");

const signupUser = async (req, res) => {
  try {
    //verificacion de ingreso de informacion
    const {username, email, password} = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "fields are required" });
    }
    //seguridad en contraseña
    const hashedPass = hashPassword(password);
    //establezco la fecha de hoy para la verificacion de pagos y meses gratis de prueba
    const usersCollectionRef = db.collection('users').doc()

    const newProfile = {
      username: username,
      password: hashedPass,
      email: email,
    };

    const userProfileRef = usersCollectionRef.set(newProfile)

    console.log("Profile created with ID: ", usersCollectionRef.id);

    res.status(201).json({ message: "Profile created successfully" });
  } catch (error) {
    console.error("Error creating a profile: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = signupUser;