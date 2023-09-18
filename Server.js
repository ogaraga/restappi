//importing modules and requiring them

require('dotenv').config();
var mongoose = require('mongoose');
var express = require('express');
var PORT = process.env.PORT || 3000;
var app = express();
var User = require('./models/User');


//parsing data using json
app.use(express.json());

//connect to database.
   
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MY_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>console.log('Database Connected successfully!')).catch(()=>console.log('Database connection failed!'))
    
      //get a response of your request from server

app.get('/userpage', async (req, res)=>{
   try {
    const allUsers = await User.find();
    res.status(200).json(allUsers)
   } catch (error) {
    res.status(400).json(error.message);
   } 
}),

//post your request and get a response from server
app.post('/userpage', async (req, res)=>{
   
    try {
    const userDetails = new User({
        username: req.body.username,
        age: req.body.age,
        genotype: req.body.genotype,
        height: req.body.height,
        weight: req.body.weight,
        village: req.body.village,
        cityAddress: req.body.cityAddress
    })

    await userDetails.save();
    res.status(200).json(userDetails)
   } catch (err) {
    res.status(404).json(err);
   }
   }), 
  

// update going on in the server 
app.put('/update/:_id', async (req, res)=>{
   const edittedUser = await User.findByIdAndUpdate(req.params, {$set: req.body});
   await edittedUser.save().then(data=>res.status(200).json(data)).catch(err=>res.status(400).json(err.message));
    
}),

//delete a request here
app.delete('/delete/:_id', async (req, res)=>{
    try{
    const removedUser = await User.deleteOne(req.params);
    res.status(200).json(removedUser);
   }catch(err){
    res.status(400).json({Message: 'Something went wrong!'});
   }
});



app.listen(PORT, ()=>console.log(`Server is connected on port ${PORT}`));
