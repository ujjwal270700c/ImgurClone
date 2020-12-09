
const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
require('./config/conn');
const port =process.env.PORT || 3005

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api/users',require('./routes/user'));
app.use('/api/auth',require('./routes/login'));
app.use('/api/image',require('./routes/images'))
app.listen(port,()=>{
    console.log(`server running at port no:${port}`);
})



