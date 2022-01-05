const http=require('http');
const path=require('path');
const express=require('express');
const body_parser = require('body-parser');

const app=express()
const adminroutes = require('./controllers/admin'); //admin controller
const productroutes = require('./controllers/Main'); //site controller 
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'/public')));
app.use(body_parser.urlencoded({extended : true}));
app.use(productroutes);
app.use('/admin',adminroutes);
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','page-notfound.html'));
})
app.listen(3000);


