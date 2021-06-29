const express = require('express');
const crypto = require('crypto');
const { sequelize, User } = require('../../models/index')
const createHash = require('../../chash');
const router = express.Router();
const getCookie = require('../../middleware/getcookie');

router.get('/join_terms', (req, res) => {
    res.render('../views/join_terms.html',{isLogin:req.session.isLogin});
})

router.get('/join_signup', (req, res) => {
    res.render('../views/join_signup.html',{isLogin:req.session.isLogin});
})

router.post('/join_success', async (req, res) => {
    let { userid, username, gender, userphone, useremail } = req.body
    let userpw = crypto.createHmac('sha256', Buffer.from(process.env.salt))
                                                   .update(req.body.userpw)
                                                   .digest('base64')
                                                   .replace('=','')
                                                   .replace('==','')
    let token = createHash(req.body.userpw)
    let result = await User.create({
        userid, userpw, username, gender, userphone, useremail
    }).catch(e => {
        console.log(e.errors[0].message)
    })
    res.render('../views/join_complete.html', {
        userid, username,
    });
})

router.get('/check', async (req, res) => {
    console.log('check 접근중');
    userid = req.query.userid
    result = await User.findOne({
        where: { userid }
    })
    console.log(req.query)
    if (result == undefined) {
        check = true;
    } else {
        check = false;
    }
    res.json({ check })
})

router.get('/info', async(req,res)=>{
    let cookieString = req.headers.cookie;
    let signedinId = getCookie(cookieString)
    console.log(signedinId)
    if (signedinId == '' || signedinId == undefined || signedinId == null) {
        let userAuth = {
            msg: '회원만 접근 권한이 있습니다.',
            move: 'http://localhost:3000/',
        }
        res.render('../views/user/userinfo.html', { userAuth });
        return;
    } else{
        let result = await User.findOne({
            where:{
                userid:signedinId
            }
        })
        console.log(result)
        let gender = (result.dataValues.gender==true) ? '남자' : '여자'
        res.render('../views/user/userinfo.html',{
            isLogin:req.session.isLogin,
            result,
            gender,
        })
    }
})

router.post('/info_success', async(req,res)=>{
    let cookieString = req.headers.cookie;
    let signedinId = getCookie(cookieString)
    console.log(req.body)
    let {username,userphone,useremail} = req.body;
    let userpw = crypto.createHmac('sha256', Buffer.from(process.env.salt))
                                                   .update(req.body.userpw)
                                                   .digest('base64')
                                                   .replace('=','')
                                                   .replace('==','')
    let token = createHash(req.body.userpw)
    let result = await User.update({
        username, userphone, useremail, userpw: token
    }, {where:{userid:signedinId}})
    let asd='update done'
    res.json({asd})
})

module.exports = router;