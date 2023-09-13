const mongoose = require('mongoose');

const app = require('./app');

const {CONTACTS_HOST, PORT = 3000} = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(CONTACTS_HOST).then(
  ()=>{
    app.listen(PORT, () => { console.log("Database connection successful!")})
}).catch( error =>{
  console.log(error.message);
  process.exit(1);
})
