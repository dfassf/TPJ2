const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const createToken = require('../../jwt');
const createHash = require('../../chash');
const crypto = require('crypto');
const {sequelize, User} = require('../../models/index')


router.get('/', async (req,res)=>{
    let modLogin = req.session.modLogin
    if(modLogin!==undefined || modLogin==true){
        res.redirect('/admin/curr')
    }
    else{
        res.render('main_admin.html');
    }
});

router.post('/auth/local/login', async(req,res)=>{
    console.log('POST 관리자 로그인 시도중');

    let {userid, userpw} = req.body;

    console.log('req.body : ',req.body);

    let result = {};
    let token = createHash(userpw);
    
    console.log('token : ',token);
    
    let check = await User.findOne({
        where: {
            userid:userid,
            userpw:token,
            usertype:2,
        }
    })
    let token2 = createToken(userid)

    if(check == null){
        result = {
            result:false,
            msg: 'check the id or the password',
        }
        console.log('관리자 로그인 실패!')
    } else{
        result = {
            result:true,
            id:userid
        }
        console.log('관리자 로그인 성공!')
        res.cookie('AccessToken',token2,{httpOnly:true, secure:true})
        req.session.modLogin = true;
        req.session.isLogin = true;
    }
    res.json(result)
})

module.exports = router;