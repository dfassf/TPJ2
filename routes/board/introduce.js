const express = require('express');
const router = express.Router();
const {sequelize,Review,User, Curriculum} = require('../../models/index')

router.get('/',async (req,res)=>{
    try{
        res.render('../views/introduce/introduce.html', {isLogin: req.session.isLogin})
    } catch(e){console.log(e)}
})
       

module.exports = router;