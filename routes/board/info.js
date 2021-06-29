const express = require('express');
const router = express.Router();

router.get('/list',(req,res)=>{
    res.render('./review/list.html')
})

router.get('/write',(req,res)=>{
    res.render('./review/write.html')
})

router.post('/write',(req,res)=>{
    console.log(req.body);
    res.redirect('./review/list')
})

router.get('/view',(req,res)=>{
    res.render('./review/view.html')
})

module.exports = router;