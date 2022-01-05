const { rejects } = require('assert');
const e = require('express');
const express=require('express');
const mysql=require('mysql');
const routes=express.Router();
//connecting to database
const db=mysql.createConnection({
     host : 'localhost',
     user : 'pg',
     password : 'test123',
     database : 'shopdb'
})
db.connect((err)=>{
 if(err){
      throw err 
 }
 console.log("mysql connected !!");
});



//routes for admin  main  dashboard
routes.get('/admin-dashboard',(req,res,next)=>{

     const maincategory=[];
     const status={'data':false,'Message':'Main Category added succesfully'};
     res.render('./admin/admin-dashboard',{'sucess':status,'maincategory': maincategory});
});

//request for handling admin main-dashboard
routes.get('/admin',(req,res,next)=>{

     const maincategory=[];
     const status={'data':false,'Message':'Main Category added succesfully'};
     res.render('./admin/admin-dashboard',{'sucess':status,'maincategory': maincategory});
});

routes.post('/add-maincategory',(req,res,next)=>{
  let maincategory=req.body;
  console.log("main category"+maincategory.mcategory);
  const URL='/'+maincategory.mcategory;
  let data={Name : maincategory.mcategory,url:URL};
     let sql="insert into maincategory set ?";
     let querry=db.query(sql,data,(err)=>{
         if(err){
              throw err;
         }
         const status={'data':true,'Message':'Main Category added succesfully'};
         res.render('./admin/AddCategory',{'sucess':status,'maincategory': maincategory});
         console.log("Category addedd");
     });
});



//request for handling manage product view
routes.get('/manageproducts',(req,res,next)=>{
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
          // console.log(subcategory);
        
          });
        
        });
        setTimeout(()=>{
         
          const status={'data':false,'Message':'Sub Category added succesfully'};
          res.render('./admin/manageProducts',{'maincategory': maincategory,'subcategory' :subcategory,'sucess':status});
     },3000);
  
});
// //request
// routes.get('/managesubcategory',(req,res,next)=>{
//      const maincategory=[];
//      let sql="select * from maincategory";
//      let querry=db.query(sql,(err,result)=>{
//           if(err){
//                throw err;
//           }
        
//           Object.keys(result).forEach((key)=>{
//            let row=result[key];
//            //console.log(row.Name+" id : "+row.id);
//            let temp={'Name' : row.Name , 'id': row.id};
//            maincategory.push(temp);
//          // console.log(maincategory);
        
//           });
        
//         });
//         setTimeout(()=>{
//           res.render('./admin/managesubcategory',{'maincategory' :  maincategory});
//       },3000);
     

// });


//request for getting add category view
routes.get('/add-category',(req,res,next)=>{

     const maincategory=[];
     let sql="select * from maincategory";
     let querry=db.query(sql,(err,result)=>{
          if(err){
               throw err;
          }
        
          Object.keys(result).forEach((key)=>{
           let row=result[key];
           //console.log(row.Name+" id : "+row.id);
           let temp={'Name' : row.Name , 'id': row.id};
           maincategory.push(temp);
         // console.log(maincategory);
        
          });
        
        });
        setTimeout(()=>{
          res.render('./admin/AddCategory.ejs',{'sucess': false,'maincategory' :  maincategory});
      },3000);
     
});

//request for handling update category view
routes.get('/update-category',(req,res,next)=>{

     const maincategory=[];
     const subcategory=[];
     let sql="select * from maincategory";
     let querry=db.query(sql,(err,result)=>{
          if(err){
               throw err;
          }
        
          Object.keys(result).forEach((key)=>{
           let row=result[key];
           //console.log(row.Name+" id : "+row.id);
           let temp={'Name' : row.Name , 'id': row.id};
           maincategory.push(temp);
         // console.log(maincategory);
        
          });
        
        });

         sql="select * from subcategory";
         querry=db.query(sql,(err,result)=>{
             if(err){
                  throw err;
             }
           
             Object.keys(result).forEach((key)=>{
              let row=result[key];
              //console.log(row.Name+" id : "+row.id);
              let temp={'Name' : row.Name , 'mid': row.Mcategoryid,'id' : row.Subid};
              subcategory.push(temp);
            // console.log(maincategory);
           
             });
           
           });
        setTimeout(()=>{
          const status={'data':false,'Message':'Main Category added succesfully'};
          res.render('./admin/Updatecategory',{'maincategory' :  maincategory,'subcategory': subcategory,'sucess':status});
      },3000);


});


//////////////////////////////////////////////////////////POST REQUESTS ///////////////////////////////////////////


/*
* request handling for main category update here we update both the Main category and it's assocated subcategory and product url
*/ 
routes.post('/update-maincategory',(req,res,next)=>{
 const formdata=req.body;
 const status=true;
 const subcategory=[];
 const MaincategotyId=formdata.maincategory.split(',')[0];
 const MaincategotyName=formdata.maincategory.split(',')[1];
 const newname=formdata.newname;
 //console.log(MaincategotyId+":"+MaincategotyName+":"+newname);
let sql="select *  from subcategory where Mcategoryid="+MaincategotyId;
let querry=db.query(sql,(err,result)=>{
     if(err){
          throw err;
     }
     Object.keys(result).forEach((key)=>{
          let row=result[key];
         
          let temp={'id' : row.Subid,'suburl':row.suburl};
          subcategory.push(temp);
      
           
         });
         const newdata=[];
         for(var k=0;k<subcategory.length;k++)
         {
           const subid=subcategory[k].id;
           const newurl=subcategory[k].suburl.replace(MaincategotyName,newname);
           newdata.push({"Subid":subid,"suburl":newurl});
         }

         newdata.forEach((items)=>{
            var sql="update subcategory set suburl='"+items.suburl+"' where Subid="+items.Subid;
            db.query(sql,(err,results)=>{
                if(err) throw err

               // console.log(results.affectedRows);
                
                
            });

           
         });

          const product_data=[];
         for(var k=0;k<subcategory.length;k++)
         {
          sql="select *  from product where Subid="+subcategory[k].id;
           db.query(sql,(err,results)=>{
               if(err) throw err;
               Object.keys(result).forEach((key)=>{
                    let row=results[key];
                         //console.log(row.Name+" id p: "+row.Pid);
                         //let temp={'id' : row.Subid,'suburl':row.suburl};
                        //  subcategory.push(temp);
                        product_data.push({'Pid':row.Pid,'url':row.purl});
               });
                 
           });
         }
         setTimeout(()=>{
          const product_new_data=[]
          for(var j=0;j<product_data.length;j++){
               console.log("p data :"+product_data[j].url);
              const produtid=product_data[j].Pid;
              const newurl=product_data[j].url.replace(MaincategotyName,newname);
              product_new_data.push({'Pid':produtid,'purl':newurl});
          } 

          product_new_data.forEach((items)=>{
               var sql="update product set purl='"+items.purl+"' where Pid="+items.Pid;
               db.query(sql,(err,results)=>{
                     if(err) throw err;
                    console.log(results.affectedRows);
               });
          });
          const status={'data':true,'Message':'main catgory updated succesfully'};

          res.render('./admin/Updatecategory',{'maincategory' :  [],'subcategory': [],'sucess':status})
      },3000);
      sql="update maincategory set url='/"+newname+"', Name='"+newname+"' where id="+MaincategotyId;
      db.query(sql,(err,results)=>{
       if(err) throw err
       console.log(results.affectedRows);
      });
});
});


/*
* request handling for sub category update here we update both the Main category and it's assocated subcategory and product url
*/ 
routes.post('/update-subcategory',(req,res,next)=>{
     const formdata=req.body; //getting form data
     
   const subcategoryId=formdata.currentsubcatogy.split(',')[0]; //we are fetching the subcategoy id and name from request from the selected subcategory [ select feild]
   const subcategoryname=formdata.currentsubcatogy.split(',')[1];
   const newsubname=formdata.newsubname; //new name of subcategory
  // console.log("new sub name :"+newsubname+"old name "+subcategoryname);

  ///chnage all product url assocted with subcategory changed
const products=[] 
let sql="select * from product where Subid="+subcategoryId;
console.log(sql);
let querry=db.query(sql,(err,result)=>{
     if(err){
          throw err;
     }
     //iterate though the fetched data
     Object.keys(result).forEach((key)=>{
          let row=result[key];
         console.log("P data =="+row.purl);
          let temp={'id' : row.Pid ,'purl':row.purl};
          products.push(temp);
        
         });

          //creating a new product datawith updated url;
         const product_new_data=[]
         for(var j=0;j<products.length;j++){
              console.log("p data :"+products[j].url);
             const produtid=products[j].id;
             const newurl=products[j].purl.replace(subcategoryname,newsubname);
             console.log('new url'+newurl);
             product_new_data.push({'Pid':produtid,'purl':newurl});
         }
          ///update product url information 
         product_new_data.forEach((items)=>{
          var sql="update product set purl='"+items.purl.replace(subcategoryname,newsubname)+"' where Pid="+items.Pid;
          console.log(sql);
          db.query(sql,(err,results)=>{
               if(err) throw err
               console.log(results.affectedRows);
           });
         });
          //update the subcategory url
         sql="update subcategory set suburl='/"+newsubname+"', Name='"+newsubname+"' where Subid="+subcategoryId;
         db.query(sql,(err,results)=>{
          if(err) throw err
          console.log(results.affectedRows);
         });
          //inform user about theupdate status
         const status={'data':true,'Message':'sub catgory updated succesfully'};

          res.render('./admin/Updatecategory',{'maincategory' :  [],'subcategory': [],'sucess':status})
     });

});


///request for handling to update product information

routes.post('/add-product',(req,res,next)=>{
     let product_data=req.body;
     
     const MaincategoryId=product_data.Maincategory.split(',')[0]; //get main category id from request
     const MaincategoryName=product_data.Maincategory.split(',')[1];//get main category name from request
     const SubcategoryId=product_data.Subcategory.split(',')[0];
     const SubcategoryName=product_data.Subcategory.split(',')[1];
     const productname=product_data.productname;
     //console.log("main category"+SubcategoryId+":::"+MaincategoryName);
     //console.log("sunb category"+MaincategoryId+":::"+SubcategoryName);
    // console.log("main sub"+product_data.Subcategory);
     //console.log("Name"+product_data.productname);
    
     //creating ew product url 
    const url="/"+MaincategoryName+"/"+SubcategoryName+"/"+productname;
    const data={Subid : SubcategoryId,Name : productname,purl:url};
     //getting new product name
     const producyname=product_data.productname;
     
        let sql="insert into product set ?";
      //update the product information
        let querry=db.query(sql,data,(err)=>{
            if(err){
                 throw err;
            }
            const status={'data':true,'Message':'Main Category added succesfully'};
            const maincategory=[];
            const subcategory=[];
            res.render('./admin/AddCategory',{'sucess':status,'maincategory': maincategory});
            res.render('./admin/manageProducts',{'maincategory': maincategory,'subcategory' :subcategory });
        });
        
   });
   
//request for handling add new subcategory
   routes.post('/add-subcategory',(req,res,next)=>{
    // console.log(req.body.maincategory);
     const mid=req.body.maincategory; //get main category id 
     const subname=req.body.subname;//get subcategory information
     //console.log(mid);
     let sql="select Name from maincategory where id="+mid;
     let maincategoryname='';
     //adding new  subcategory to table 
     let querry=db.query(sql,(err,result)=>{
          if(err){
               throw err;
          }
          //console.log("new results :: "+result[0].Name);
          Object.keys(result).forEach((key)=>{
           let row=result[key];
          // console.log(row.Name);
           maincategoryname=row.Name;
           let URL='/'+maincategoryname+'/'+subname;
           let data={Mcategoryid : mid,Name : subname,suburl : URL}
           //console.log("DATA >>>"+data);
           sql="insert into subcategory set ?";
           querry=db.query(sql,data,(err)=>{
          if(err){
              throw err;
          }
          //update user with status message 
          const status={'data':true,'Message':'Sub Category added succesfully'};
          res.render('./admin/AddCategory',{'sucess':status,'maincategory': maincategory});
     });
          });
             });
      });
     


module.exports=routes;