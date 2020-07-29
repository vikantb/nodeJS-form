const express=require('express');
const mongoose=require('mongoose');
const fs=require('fs');
const bodyParser=require('body-parser');
const path=require('path');
const multer=require('multer');
const ejs=require('ejs');

const app=express();

app.use(express.static(path.join(__dirname, 'items')));

var url='mongodb+srv://**:**@cluster0.7zx0w.mongodb.net/vicky?retryWrites=true&w=majority';

mongoose.connect( url, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    } 
    ); 

var data=mongoose.model('details',{
      name:String,
      lname:String,
      m_no:Number,
      email:String,
      gender:String,
      hobbies:String,
      qualification:String
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.get("/",(req,res,next)=>{
      res.render("index",{data:""});
});

app.post("/",(req,res)=>{
     
    var text="";
    
    try{
        req.body.hobbies.forEach(element => {
              text += element + " , "  ;  
         })
       }
    catch(e){
              text=req.body.hobbies;
        }  

    var obj={
        name:req.body.name,
        lname:req.body.lname,
        m_no:req.body.mno,
        email:req.body.email,
        gender:req.body.gender,
        hobbies:text,
        qualification:req.body.qualification
    }

    data.create(obj,(err,item)=>{
        if(err)
         return res.send(err);
         else{
             console.log(item);
             res.render("index",{data:"Data saved..."});
         }
    });

});

app.listen(process.env.PORT || 4545,()=>{
    console.log("server connected..");
});
