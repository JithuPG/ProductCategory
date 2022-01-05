const express=require('express');

const routes = express.Router();

routes.get('/test',(req,res,next)=>{

    res.render('index',{Pagetitles: "product page"});
});

module.exports = routes;