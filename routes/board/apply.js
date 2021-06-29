const express = require('express');
const router = express.Router();
//apply review쪽  isLogin 완료
const {sequelize,Application,Curriculum} = require('../../models/index')

router.get('/', async(req,res)=>{

    try{

        let result = await Curriculum.findAll({
            where:{show:1,ifdeleted:null},
            raw:true,
        })

        res.render('../views/user/apply.html',{
            isLogin: req.session.isLogin,
            currList:result,
        })
    }
    catch(e){
        console.log(e);
    }
})

router.post('/submit',async(req,res)=>{
    console.log('apply submit 접근중');

    let {curr_id, username, gender, userage, useremail, userphone, content} = req.body;
    
    console.log('req.body : ',req.body);

    let applyAdd = await Application.create({
        curr_id, username, gender, userage, useremail, userphone, content,
    })

    res.render('../views/user/apply_complete.html', {isLogin: req.session.isLogin});
})

module.exports = router;