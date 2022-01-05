const express=require('express');
const mysql=require('mysql');

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
const routes = express.Router();

routes.get('/',(req,res,next)=>{


    let sql="select * from maincategory";
    const maincategory=[];
    const subcategory=[];
    const nestedsubcategory=[];
    const product=[];
    
    let querry=db.query(sql,(err,result)=>{
      if(err){
           throw err;
      }
      //console.log("new results :: "+result[0].Name);
      Object.keys(result).forEach((key)=>{
       let row=result[key];
       //console.log(row.Name+" id : "+row.id);
       let temp={'Name' : row.Name , 'id': row.id};
       maincategory.push(temp);
     // console.log(maincategory);
    
      });
    
      
    
    });
    sql="select * from subcategory";
    let querry2=db.query(sql,(err,result)=>{
         if(err){
              throw err;
         }
         //console.log("new results :: "+result[0].Name);
         Object.keys(result).forEach((key)=>{
          let row=result[key];
         // console.log(row.Name+" id : "+row.id);
          let temp={'Name' : row.Name , 'mid': row.Mcategoryid,'id':row.Subid};
         
          subcategory.push(temp);
          console.log(subcategory);
       
         });
       
         
       
       });
    
       sql="select * from nestedsubcategory";
       let querry4=db.query(sql,(err,result)=>{
            if(err){
                 throw err;
            }
            //console.log("new results :: "+result[0].Name);
            Object.keys(result).forEach((key)=>{
             let row=result[key];
             //console.log(row.Name+" id : "+row.id);
             let temp={'Name' : row.Name , 'subid': row.Subid,'Nsubid ':row.Nsubid ,"value" : row.value};
            
             nestedsubcategory.push(temp);
             //console.log(nestedsubcategory);
          
            });
          
          
          });
       
          sql="select * from product";
          let querry3=db.query(sql,(err,result)=>{
               if(err){
                    throw err;
               }
               //console.log("new results :: "+result[0].Name);
               Object.keys(result).forEach((key)=>{
                let row=result[key];
               // console.log(row.Name+" id : "+row.id);
                let temp={'Name' : row.Name , 'Pid': row.Pid,'Subid':row.Subid };
               
                product.push(temp);
               console.log(product);
             
               });
             
             
             });
    
    setTimeout(()=>{
        res.render('index',{Pagetitles: "product page",'product':product,'nestedsubcategory':nestedsubcategory,'subcategory':subcategory,'maincategory':maincategory});
    },3000);
    

   
});



module.exports = routes;