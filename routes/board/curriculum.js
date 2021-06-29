const express = require('express');
const router = express.Router();
const {sequelize, Curriculum} = require('../../models/index')

//페이지 세팅 필요할지?

router.get('/',async (req,res)=>{
    try{
        let result = await Curriculum.findAll({})
        res.render('../views/curr/curr_index.html',{
            noticeList:result,
            isLogin: req.session.isLogin
    })
    } catch(e){console.log(e)}
})

router.get('/view',async (req,res)=>{
    try{
        let result = await Curriculum.findAll({
            where:{id:req.query.id}
        }); 


        // 수강기록에 맞추어 제목을 추출
        // 하여 배열에 담는다
        res.render('./faq/view.html',{
            result,
            isLogin: req.session.isLogin
        });
        } catch(e){console.log(e)}
})

module.exports = router;