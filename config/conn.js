const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/Imgur123",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connection is sucessful"))
.catch((err) => console.log("NO connection"))   