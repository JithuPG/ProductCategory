const express=require('express');
const mysql=require('mysql');
const routes=express.Router();

const db=mysql.createConnection({
     host : 'localhost',
     user : 'pg',
     password : 'test123',
     database : 'shopdb'
});
db.connect((err)=>{
 if(err){
      throw err 
 }
 console.log("mysql connected !!");
});

module.exports=routes;