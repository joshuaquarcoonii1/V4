const mongoose = require('mongoose');


const mySchema= new mongoose.Schema({
    username:{
        type:String,
        
    },
  
    password:{
        type:String,
        
        
    }
    
    })

    const User =new mongoose.model('optiwaste',mySchema,'optiwaste');

    module.exports=User;