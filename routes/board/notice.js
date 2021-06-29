const express = require('express');
const {sequelize, Notice} = require('../../models/index')
const router = express.Router();

router.get('/', async (req,res)=>{
    console.log('nontice_list 접근중');

    try {
        let loadData = await sequelize.query('SELECT * FROM notice where \`show\`=1;')

        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let allNot = await sequelize.query('select * from notice where \`show\`=1;');
        let resultsall = await sequelize.query('select * from notice where \`show\`=1;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
        ;
        let results = await sequelize.query(`select id, title, content, date_format(registereddate, '%Y-%m-%d') as registereddate, hit, \`show\` from notice where \`show\`=1 order by id desc limit 3 offset ${offset};`)
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

                for(let i=block_first; i<=block_last; i++){
                    block_arr.push(i)
                }

                let nextBlock = 1 + (block * (block_start))
                if (nextBlock > total_page) nextBlock = total_page
                let prevBlock = ((block_start - 1) * block) - 9;
                if (prevBlock < 0) prevBlock = 1

                res.render('../views/user/notice_list.html', {
                    noticeList: result[0],
                    totalNot: allNot[0],
                    searchPages: page_array,
                    ifEmpty,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                    isLogin:req.session.isLogin,
                });

            })
    }
    catch (e){
        console.log(e);
    }
})

router.get('/search', async (req, res) => {
    console.log('notice_search 접근중');

    try {
        let { srcCtg, keyword } = req.query
        console.log('1차검색', srcCtg)
        function getSql() {
            if (srcCtg == 'all') {
                let sql = `and concat (title, '', content, '') like '%${keyword}%' `
                console.log('case 1')
                return sql;
            }
            else if (srcCtg == '' && keyword == '') {
                let sql = '';
                console.log('case 2')
                return sql;
            }
            else {
                let sql = `and concat (${srcCtg}, '') like '%${keyword}%' `
                console.log('case 3')
                return sql;
            }
        }
        let sql = getSql()
        let loadData = await sequelize.query(`SELECT * FROM notice where \`show\`=1 ${sql}`)

        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let allNot = await sequelize.query(`select * from notice where \`show\`=1 ${sql}`);
        let resultsall = await sequelize.query(`select * from notice where \`show\`=1 ${sql}`)
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
        ;
        let results = await sequelize.query(`select id, title, content, date_format(registereddate, '%Y-%m-%d') as registereddate, hit, \`show\` from notice where \`show\`=1 ${sql} order by id desc limit 3 offset ${offset}`)
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
                } else { ifEmpty = true; }

                let block = 10;
                let block_article = Math.ceil(page_array.length / block);
                let block_arr = [];
                let block_start = Math.ceil(page / block);
                let block_first = 1;
                if (block_start != 1) {
                    block_first = 1 + (block * (block_start - 1));
                }
                let block_last = block_start * block
                if (block_last > total_page) {
                    block_last = total_page;
                }
                for (let i = block_first; i <= block_last; i++) {
                    block_arr.push(i);
                }
                let nextBlock = 1 + (block * (block_start))
                if (nextBlock > total_page) nextBlock = total_page;
                let prevBlock = ((block_start - 1) * block) - 9;
                if (prevBlock < 0) prevBlock = 1;

                res.render('../views/user/notice_list.html',{
                    noticeList:result[0], 
                    totalNot:allNot[0], 
                    searchPages:page_array,
                    ifEmpty, srcCtg, keyword,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                    isLogin:req.session.isLogin,
                });
            })
    }
    catch (e){
        console.log(e);
    }
})

router.get('/view', async(req,res)=>{
    try {
        console.log('notice_view 접근중');

        let result = await Notice.findOne({
            where: { id: req.query.id }
        });

        let hit = result.dataValues.hit
        hit += 1;
        let addHit = await Notice.update({
            hit: hit
        }, { where: { id: req.query.id } })
       
        res.render('../views/user/notice_view.html', {
            result,
            isLogin:req.session.isLogin,
        });
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = router;