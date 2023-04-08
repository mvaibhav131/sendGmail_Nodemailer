const express=require('express');
const appRoute = require("./routes/route");
const cors=require('cors');
require('dotenv').config();

const PORT= process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api",appRoute);

app.get("/",(req,res,next)=>{
    res.send("<h1 style='color:green;font-size:99px' >Welcome to Gmail Service!</h1>")
});

app.listen(PORT,()=>{
    console.log(`Server started in ${PORT}`)
})