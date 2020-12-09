const express= require('express');
const router =express.Router();
const jwt =require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcryptjs');
const UserModel=require('../models/usermodel');
const {check,validationResult}=require('express-validator')
const auth=require('../middlewares/auth')

router.get('/',auth,async(req,res)=>{
    try{
        const user=await (await UserModel.findById(req.user.id)).select('-password');
        res.json(user);

    }catch(error){
        console.log(error.message);
        res.status(500).send("server error")
    }
});   

router.post('/',[
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Enter password with min 6 or more').exists()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    try{
        let user=await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User not found"})
        }
        const checkpassword=await bcrypt.compare(password,user.password);
        if(!checkpassword){
            return res.status(400).json({msg:"Wrong password"})
        }
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
         console.log(error.message);
         res.status(500).send("server error")
    }
});
module .exports=router;   