const express = require('express');
const router = express.Router();
const {sequelize, Interview} = require('../../models/index')

//페이지 세팅 필요할지?

router.get('/',async (req,res)=>{
    try{
        let result = await Interview.findAll({})
        console.log(result)



        let result2 = await sequelize.query('select a.id, a.username, a.content, a.curr_id, curriculum.subject from interview as a left join curriculum on a.curr_id=curriculum.id where a.\`show\`=1;')
        console.log(result2[0])


        res.render('../views/user/interview.html',{
            ccList:result2[0],
            isLogin: req.session.isLogin,
    })
    } catch(e){console.log(e)}
})

router.get('/view',async (req,res)=>{
    try{
        let result = await Interview.findAll({
            where:{id:req.query.id}
        }); 


        // 수강기록에 맞추어 제목을 추출
        // 하여 배열에 담는다
        res.render('./faq/view.html',{
            result,
            isLogin: req.session.isLogin,
        });
        } catch(e){console.log(e)}
})

module.exports = router;