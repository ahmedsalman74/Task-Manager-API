const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config();

const uri=process.env.MONGO_URL;
mongoose.connect(uri).then(()=>{
console.log("DB connection established ....")

});



app.use(express.static('./public'));
app.use('/api/v1/tasks', tasks)


// glopal middleware for routs error 

app.all("*",(req, res,next)=>{
    return res.status(404).json({status : "Error", message:"this route not found"});
})
//glopal meddileware for error hundeller 
app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({status :error.statusText|| "error",message:error.message ,code :error.statusCode , data:null});
}
)


app.listen(process.env.port||5000,(req, res)=>{
    console.log("listening to port ",process.env.port +"..."||5000);
});