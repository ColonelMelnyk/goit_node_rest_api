const mongoose = require('mongoose');

const app = require('./app');

const CONTACTS_HOST = "mongodb+srv://Melnyk:WalkingNewbie2024@cluster1.a15gywb.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);

mongoose.connect(CONTACTS_HOST).then(
  ()=>{
    app.listen(3000, () => { console.log("Server running. Use our API on port: 3000")})
}).catch( error =>{
  console.log(error.message);
  process.exit(1);
})
