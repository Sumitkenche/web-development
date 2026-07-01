const express=require("express");
const app=express();
const port=3000;
const path =require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));


let posts=[
    {
        id:uuidv4(),
        photo:"MH.jpg",
        caption:"Jay Maharashtra"
    },
    { 
        id:uuidv4(),
        photo:"KA.jpg",
        caption:"Mrudeshwar temple on a coast of arabian sea"
    },
    {
        id:uuidv4(),
        photo:"KL.jpg",
        caption:"Allapy kerala",
    }
];

app.get("/home",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/home/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/home",(req,res)=>{
     let id=uuidv4();     //is assignes to  newly submitted post and caption 
    let{photo,caption}=req.body; 
   
    console.log(req.body);
   
    posts.push({id,photo,caption}); //data pushed in array
     res.redirect("/home");  //redirected to home tab
});

app.get("/home/:id",(req,res)=>{
    let {id}=req.params;
   
    let data=posts.find((p)=>id===p.id);
    console.log(data);
    res.render("unique.ejs",{data});
});

app.patch("/home/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let newcaption=req.body.caption;
    post.caption=newcaption;
    console.log(post);
    res.redirect("/home");
});

app.get("/home/:id/edit",(req,res)=>{
    let {id}=req.params;
    let data=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{data});

});
app.delete("/home/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/home");
});
app.listen(port,()=>{console.log(`listening to port ${port}`)});