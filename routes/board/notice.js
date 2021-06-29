const express = require('express');
const {sequelize, Notice} = require('../../models/index')
const router = express.Router();

router.get('/',async (req,res)=>{
        let result = await Notice.findAll({})
        console.log(result)
    res.render('../views/notice/list.html',{
        noticeList:result,
    })
})

router.get('/write',(req,res)=>{
    // 관리자모드에서 ON
})

router.post('/write',(req,res)=>{
    // 관리자모드에서 ON
})

router.get('/view', async(req,res)=>{
    let result = await Notice.findAll({
        where:{id:req.query.id}
    });
    let hit = result[0].dataValues.hit
        hit+=1;
    let addHit = await Notice.update({
        hit:hit
    },{where:{id:req.query.id}})
    res.render('../views/notice/view.html',{
        noticeList:result,
    });
})

router.get('/modify',(req,res)=>{
    // 관리자모드에서 ON
})

module.exports = router;