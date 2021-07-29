var admin = require("firebase-admin");

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://clientFinal.firebaseio.com',
});

const db = admin.firestore()
const storage = admin.storage()
// if (isDevelopment) db.settings({ host: "localhost:8080", ssl: false })

module.exports = {
  db,
  storage,
  admin
};