const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const config=require('config');
const UserModel=require('../models/usermodel');
const {check,validationResult}=require('express-validator')

router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Enter password with min 6 or more').isLength({
        min:6 })
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.body;
    try{
     let user=await UserModel.findOne({email});
     if(user){
         return res.status(400).json({msg:"User already exixst"})
     }
    user= new UserModel({
        name,
        email,
        password
    })
      const salt = await bcrypt.genSalt(10);
      user.password=await bcrypt.hash(password,salt);
      await user.save();
      const payload={
          user:{
              id:user.id
          }
      };
      jwt.sign(payload,config.get('SecretKey'),{
          expiresIn:360000
      }, (err,token)=>{
         if(err) throw err;
         res.json({token}); 
      })
    }catch(error){
       res.status(400);
    }
    
});

module.exports=router;