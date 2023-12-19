require('dotenv').config();

const admin = require('firebase-admin')
//const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../firebase.json'); // Ruta a tu archivo de credenciales de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore()
const FieldValue = admin.firestore.FieldValue;
//console.log(db) esta conectado No tocar

module.exports = {
  db,
  FieldValue,
};