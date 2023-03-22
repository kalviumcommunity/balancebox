const mongoose=require('mongoose');
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected!")
}).catch(e=>console.log(e))