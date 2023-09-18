var mongoose = require('mongoose');
var express = require('express');
var app = express();

//building a schema for the user
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        uppercase: true,
        require: true,

    },
    age: {
        type: Number,
        min: 18,
        max: 70
    },
    genotype: {
        type:String
    },

    height:{
        type: String
    },
    weight:{
        type: String
    },

    village: {
        type: String,
        require: true
    },
    cityAddress: {
        type: String,
        require: true
    }
    
},
{
timestamps:true}
);

const User = mongoose.model('User', userSchema);
module.exports = User;