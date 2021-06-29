const express = require('express');
const router = express.Router();
const { sequelize, User, Curriculum } = require('../../models/index');
const authAdmin = require('../../middleware/authadmin');
const loginCheck = require('../../middleware/getcookie');
const getCookie = require('../../middleware/getcookie');

router.get('/user', authAdmin, async (req, res) => {
    try {
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let alluser = await sequelize.query('select * from user;')
        let resultsall = await sequelize.query('select * from user;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
        let results = await sequelize.query(`select id, userid, userpw, username, gender, userphone, useremail, userclass, usertype, date_format(userdt, '%Y-%m-%d') as userdt from user order by id desc limit 3 offset ${offset};`)
            .then((result) => {
                let total_record = result[0].length;
                let total_page = Math.ceil(resultsall / 3);
                for (i = 1; i <= total_page; i++) {
                    page_array.push(i);
                };
                result[0].forEach(ele => {
                    ele.num = resultsall - offset;
                    resultsall--;
                });

                let ifEmpty;
                if (result[0].length !== 0) {
                    ifEmpty = false;
                } else { ifEmpty = true }

                let block = 10;
                let block_article = Math.ceil(page_array.length / block)
                let block_arr = []
                let block_start = Math.ceil(page / block)
                let block_first = 1;
                if (block_start != 1) {
                    block_first = 1 + (block * (block_start - 1))
                }
                let block_last = block_start * block
                if (block_last > total_page) {
                    block_last = total_page
                }

                for (let i = block_first; i <= block_last; i++) {
                    block_arr.push(i)
                }

                let nextBlock = 1 + (block * (block_start))
                if (nextBlock > total_page) nextBlock = total_page
                let prevBlock = ((block_start - 1) * block) - 9;
                if (prevBlock < 0) prevBlock = 1

                res.render('../views/admin/user_list.html', {
                    userList: result[0],
                    totaluser: alluser[0],
                    searchPages: page_array,
                    ifEmpty,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                });
            })
    } catch (e) { console.log(e) }
})

async function authDelAdmin(req, res, next) {
    let getthat = await User.findOne(
        {
            where: { id: req.query.id }
        })
    if (getthat.dataValues.ifdeleted == null) {
        next();
    }
    else {
        console.log('deleted DB')
        let adminDelAuth = {
            msg: '삭제된 게시물입니다.',
            move: 'http://localhost:3000/admin/user/'
        }
        res.render('../views/logincheck.html', { adminDelAuth })
        return;
    }
}

router.get('/user/view', authAdmin, authDelAdmin, async (req, res) => {
    try {
        let result = await User.findOne({
            where: { id: req.query.id }
        });


        let userCurr = await User.findOne({
            attributes:['userclass'],
        },{where:{
            userid:result.dataValues.userid
        }
    })
         //한 학생의 수강기록을 배열에 담는 작업

        let currArr = [];
    
        if(userCurr.dataValues.userclass==null || userCurr.dataValues.userclass==undefined||userCurr.dataValues.userclass==''){
            currArr.push('')
        }
        else{
            console.log('안널널')
            let splitCurr = userCurr.dataValues.userclass.split(' ')
            for(let i=0; i<splitCurr.length; i++){
                if(splitCurr[i]!==''){
                    currArr.push(splitCurr[i])
                }
            }
        }

        // 수강기록에 맞추어 제목을 추출하여 배열에 담는다
        let selectedCurr = [];
        if(currArr[0]!==''){
            for(let i=0; i<currArr.length;i++){
                if(currArr[i]!==''){
                    let [selCurr] = await Curriculum.findAll({
                        attributes: ['id', 'subject'],
                        where: {
                            id: currArr[i],
                            ifdeleted: null
                        }
                    })
                    selectedCurr.push(selCurr.dataValues)
                }
            } 
        }

        let loadCurr = await Curriculum.findAll({
            attributes:['id','subject'],
            where:{
                ifdeleted:null,
            }
        })   

        let loadsql = '';
        for(i=0; i<selectedCurr.length;i++){
            if(selectedCurr.length!==0){
            loadsql += `${selectedCurr[i].id}, `
            }
        }
        loadsql2 = (loadsql.length==0) ? '' : `and id not in (${loadsql.substr(0,loadsql.length-2)})`
        loadCurr = await sequelize.query( `select id, subject from curriculum where ifdeleted is null ${loadsql2};`)
        
        function getDate(date){
            var year = date.getFullYear()
            var month = (1 + date.getMonth());
            month = month >= 10 ? month : '0' + month;
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day; 
            return  year + '-' + month + '-' + day;
        }
     
        let joinDate = getDate(result.dataValues.userdt)
        let usertype=(result.dataValues.usertype=2) ? '관리자' : '일반회원'
        res.render('./admin/user_view.html', {
            result, 
            usertype,
            joinDate,
            selectedCurr,
            loadCurr:loadCurr[0]
        });
    } catch (e) { console.log(e) }
})

router.post('/user/view/addcurr', async(req,res)=>{
    try{
        let result = await User.findOne({
            where: { id: req.body.postid }
        });

        let userCurr = await User.findOne({
            attributes:['userclass'],
            where:{
                userid:result.dataValues.userid
            }
        })
         //한 학생의 수강기록을 배열에 담는 작업
         let currArr = [];
        
         if(userCurr.dataValues.userclass==null){
             currArr.push('')
         }
         else{
             let splitCurr = userCurr.dataValues.userclass.split(' ')
             for(let i=0; i<splitCurr.length; i++){
                 if(splitCurr[i]!==''){
                     currArr.push(splitCurr[i])
                 }
             }
         }
         


        // 수강기록에 맞추어 제목을 추출하여 배열에 담는다
        let selectedCurr = [];
        
        if(currArr[0]!==''){
            for(let i=0; i<currArr.length;i++){
                if(currArr[i]!==''){
                    let [selCurr] = await Curriculum.findAll({
                        attributes: ['id', 'subject'],
                        where: {
                            id: currArr[i],
                            ifdeleted: null
                        }
                    })
                    selectedCurr.push(selCurr.dataValues)
                }
            } 
        }

        let loadCurr = await Curriculum.findAll({
            attributes:['id','subject'],
            where:{
                ifdeleted:null,
            }
        })   
        let loadsql = '';
        for(i=0; i<selectedCurr.length;i++){
            if(selectedCurr.length!==0){
            loadsql += `${selectedCurr[i].id}, `
            }
        }
        loadsql2 = (loadsql.length==0) ? '' : `and id not in (${loadsql.substr(0,loadsql.length-2)})`
        loadCurr = await sequelize.query( `select id, subject from curriculum where ifdeleted is null ${loadsql2};`)

        res.json({
            selectedCurr,
            loadCurr:loadCurr[0]
        })

    } catch (error) {console.log(error)}
})

router.post('/user/view/addcurrtoserver', async(req,res)=>{
    try{
        let { postid, optid } = req.body
        let result = await User.findOne({
            where: { id: postid }
        });

        let userCurr = await User.findOne({
            attributes:['userclass'],
            where:{
                userid:result.dataValues.userid
            }
        })
         //한 학생의 수강기록을 배열에 담는 작업
        let currArr = [];
        
        if(userCurr.dataValues.userclass==null){
            currArr.push('')
        }
        else{
            let splitCurr = userCurr.dataValues.userclass.split(' ')
            for(let i=0; i<splitCurr.length; i++){
                if(splitCurr[i]!==''){
                    currArr.push(splitCurr[i])
                }
            }
        }
        
        // (userCurr.dataValues.userclass==null) ? '' : getUserCurrArray()
        // console.log(currArr)
        // 수강기록에 맞추어 제목을 추출하여 배열에 담는다
        let selectedCurr = [];
        if(currArr[0]!==''){
            for(let i=0; i<currArr.length;i++){
                if(currArr[i]!==''){
                    let [selCurr] = await Curriculum.findAll({
                        attributes: ['id', 'subject'],
                        where: {
                            id: currArr[i],
                            ifdeleted: null
                        }
                    })
                    selectedCurr.push(selCurr.dataValues)
                }
            } 
        }

        let loadCurr = await Curriculum.findAll({
            attributes:['id','subject'],
            where:{
                ifdeleted:null,
            }
        })   
        let loadsql = '';
        for(i=0; i<selectedCurr.length;i++){
            if(selectedCurr.length!==0){
            loadsql += `${selectedCurr[i].id}, `
            }
        }
        loadsql2 = (loadsql.length==0) ? '' : `and id not in (${loadsql.substr(0,loadsql.length-2)})`
        loadCurr = await sequelize.query( `select id, subject from curriculum where ifdeleted is null ${loadsql2};`)
        

        let userCurrRow = userCurr.dataValues.userclass
        userCurrRow = `${userCurrRow} ${optid}`
  
        userCurrRow2 = userCurrRow.split(' ');

        let userCurrRow4 = []
        let userCurrRow3 = userCurrRow2.sort(function(a, b)  {
            return a - b;
          })

        for(i=0; i<userCurrRow3.length;i++){
            if(userCurrRow3[i]!==''){
                userCurrRow4.push(userCurrRow3[i])
            }
        }
        let sortedUserCurr = '';

        for(i=0; i<userCurrRow4.length;i++){
            sortedUserCurr += `${userCurrRow4[i]} `
        }





        let updateUserCurr = await User.update({
            userclass:sortedUserCurr,
        },{
            where:{
                id:postid
            }
        })

        res.json({
            selectedCurr,
            loadCurr:loadCurr[0]
        })

    } catch (error) {console.log(error)}
})

router.post('/user/view/delcurrtoserver', async(req,res)=>{
    try{        
        let { postid, delid } = req.body
        let result = await User.findOne({
            where: { id: postid }
        });

        let userCurr = await User.findOne({
            attributes:['userclass'],
            where:{
                userid:result.dataValues.userid
            }
        })
         //한 학생의 수강기록을 배열에 담는 작업
        let currArr = [];
        
        if(userCurr.dataValues.userclass==null){
            currArr.push('')
        }
        else{
            let splitCurr = userCurr.dataValues.userclass.split(' ')
            for(let i=0; i<splitCurr.length; i++){
                if(splitCurr[i]!==''){
                    currArr.push(splitCurr[i])
                }
            }
        }
                
        let newCurrArr = [];
        for(let i=0; i<currArr.length; i++){
            if(currArr[i]!==delid){
                newCurrArr.push(currArr[i])
            }
        }
        

        let sortedUserCurr = '';

        for(i=0; i<newCurrArr.length;i++){
            sortedUserCurr += `${newCurrArr[i]} `
        } 
        
        let delDone = User.update({
            userclass:sortedUserCurr,
        }, {where: {id:postid}})
        let asd = 'delete done '
        res.json({asd})

    } catch (error) {console.log(error)}
})


router.get('/user/search', authAdmin, async (req, res) => {
    try {
        let alluser = await sequelize.query('select * from user;')
        let bodyComb = 'and ';
        let { userid, username, start_date, end_date } = req.query;
        if (userid.length > 0) {
            bodyComb += `userid like '%${userid}%' and `
        }
        if (username.length > 0) {
            bodyComb += `username like '%${username}%' and `
        }
        if (start_date.length > 0) {
            bodyComb += `userdt > '${start_date}' and `
        }
        if (end_date.length > 0) {
            bodyComb += `userdt < '${end_date}' and `
        }
        let sql = (bodyComb == 'and ') ? '' : `where ${bodyComb.substr(3, bodyComb.length - 7)}`;
       

        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];

        let resultsall = await sequelize.query(`select * from user ${sql};`)
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
                                      
        let results = await sequelize.query(`select id, userid, userpw, username, gender, userphone, useremail, userclass, usertype, date_format(userdt, '%Y-%m-%d') as userdt from user ${sql} order by id desc limit 3 offset ${offset};`)
            .then((result) => {
                let total_record = result[0].length;
                let total_page = Math.ceil(resultsall / 3);
                for (i = 1; i <= total_page; i++) {
                    page_array.push(i);
                };
                result[0].forEach(ele => {
                    ele.num = resultsall - offset;
                    resultsall--;
                });

                let ifEmpty;
                if (result[0].length !== 0) {
                    ifEmpty = false;
                } else { ifEmpty = true }

                let block = 10;
                let block_article = Math.ceil(page_array.length / block)
                let block_arr = []
                let block_start = Math.ceil(page / block)
                let block_first = 1;
                if (block_start != 1) {
                    block_first = 1 + (block * (block_start - 1))
                }
                let block_last = block_start * block
                if (block_last > total_page) {
                    block_last = total_page
                }
                for (let i = block_first; i <= block_last; i++) {
                    block_arr.push(i)
                }
                let nextBlock = 1 + (block * (block_start))
                if (nextBlock > total_page) nextBlock = total_page
                let prevBlock = ((block_start - 1) * block) - 9;
                if (prevBlock < 0) prevBlock = 1

                res.render('../views/admin/user_list.html', {
                    ifEmpty,
                    userList: result[0],
                    totaluser: alluser[0],
                    searchPages: page_array,
                    userid, username, start_date, end_date,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                });
            })

    } catch (e) { console.log(e) }
})

router.get('/user/delete', authAdmin, async (req, res) => {
    try {

        let result = await User.findOne({
            where: { id: req.query.id }
        });

        
        let id = req.query.id;
        await User.destroy({
            where: { id: id }
        })
        res.redirect('/admin/user');
    } catch (error) { console.log(error) }
})

/*
router.post('/user/delete',async (req,res)=>{
    try{ 
        let selDelItems = req.body.selDelItems
        console.log(selDelItems)

        let deletedAt = user.destroy({
            where:{id:selDelItems}
        })

        res.redirect('/admin/user')

    } catch(e){
            console.log(e)
      };
})
*/



module.exports = router;
