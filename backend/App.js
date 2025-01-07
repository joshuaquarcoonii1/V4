const express=require('express');
let app = express();
const mongoose =require('mongoose');
const port =9000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()
//middleware
app.use(express.json());
app.use(cors());



const mySchema= new mongoose.Schema({
    username:{
        type:String,
        
    },
  
    password:{
        type:String,
        
        
    }
    
    })

    const User =mongoose.model('optiwaste',mySchema,'optiwaste');


//database 
mongoose.connect('mongodb://localhost:27017',{ useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'optiwaste'})
.then(()=>{
    console.log("database connected");
});

//login 
app.post('/login',async(req,res)=>{
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the password (assuming it's hashed)
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Successful login
      const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
     });
      res.status(200).json({ message: 'Login successful', username: user.username,token });
      
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }},
  
  )
//signup
app.post('/signup',async(req,res)=>{
    const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Create a new user
    const newUser = new User({
      username,
      password,
    });

    // Save user to the database
    await newUser.save();

const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
   expiresIn:process.env.JWT_EXPIRES_IN
});


    // Respond with success
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


app.listen(port,()=>{
    console.log('online');
})



