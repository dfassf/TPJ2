const express = require('express');
const router = express.Router();
const {sequelize, Faq, Category} = require('../../models/index')

router.get('/', async (req,res)=>{
    console.log('FAQ 접근중');

    try{
        let faq = await sequelize.query('select * from faq where \`show\`=1 order by category;');
        let category = await Category.findAll({
            where:{show:1,ifdeleted:null},
            raw:true,
        });
        
        res.render('../views/user/FAQ.html',{
            // faqList:faq[0],
            categoryList:category,
            isLogin: req.session.isLogin,
    })
    } catch(e){
        console.log(e);
    }
})

router.post('/load', async(req,res)=>{
    let ctgId = parseInt(req.body.ctgId)
    let test=[];
    let load = await Faq.findAll({
        where:{
            show:1,
            category:ctgId
        }
    })
    for(let i=0; i<load.length; i++){
        console.log(load[i].dataValues.title)
        test.push(load[i].dataValues)
    }
    res.json({
        test
    })
})

module.exports = router;