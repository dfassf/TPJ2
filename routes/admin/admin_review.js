const express = require('express');
const router = express.Router();
const { sequelize, Review } = require('../../models/index');
const authAdmin = require('../../middleware/authadmin');

router.get('/review', authAdmin, async (req, res) => {
    try {
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;')
        let allreview = await sequelize.query('select * from review;')
        let resultsall = await sequelize.query('select * from review;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
        let results = await sequelize.query(`select a.id, a.title, a.content, a.userid, date_format(date, '%Y-%m-%d') as date, curr_id, a.hit, a.\`show\`, curriculum.subject from review as a left join curriculum on a.curr_id=curriculum.id order by id desc limit 3 offset ${offset};`)
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
                } else { ifEmpty = true}

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

                res.render('../views/admin/review_list.html', {
                    reviewList: result[0], //이거바꾸기
                    totalreview: allreview[0],  //이거바꾸기
                    searchPages: page_array,
                    ifEmpty,
                    totalCurr: allCurr[0],
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
    let getthat = await Review.findOne(
        // {attributes:['ifdeleted']},
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
            move: 'http://localhost:3000/admin/review/'
        }
        res.render('../views/logincheck.html', { adminDelAuth })
        return;
    }
}

router.get('/review/view', authDelAdmin, async (req, res) => {
    try {
        let result2 = await Review.findOne({
            where: { id: req.query.id }
        })
        let results = await sequelize.query(`select a.id, a.title, a.content, a.userid, date_format(date, '%Y-%m-%d') as date, curr_id, a.hit, a.\`show\`, curriculum.subject from review as a left join curriculum on a.curr_id=curriculum.id where a.id=${req.query.id}`)
            .then((result) => {
                res.render('../views/admin/review_view.html', {
                    reviewList: result[0],
                    boardid: req.query.id,
                });
            })
    } catch (e) { console.log(e) }
})

router.get('/review/search', authAdmin, async (req, res) => {
    try {
        console.log('here in search admin')
        let { srcCtg, keyword } = req.query;
        let allreview = await sequelize.query('select * from review;');
        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;');

        function getSql() {
            if (srcCtg == 'all') {
                let sql = `where concat (title, '', userid, '', a.content, '') like '%${keyword}%' `
                console.log('case 1')
                return sql;
            }
            else if (srcCtg == '' && keyword == '') {
                let sql = '';
                console.log('case 2')
                return sql;
            }
            else {
                let sql = `where concat (${srcCtg}, '') like '%${keyword}%' `
                console.log('case 3')
                return sql;
            }
        }
        let sql = getSql()
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let resultsall = await sequelize.query(`select * from review ${sql};`)
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
        let results = await sequelize.query(`select a.id, a.title, a.content, a.userid, date_format(date, '%Y-%m-%d') as date, curr_id, a.hit, a.\`show\`, curriculum.subject from review as a left join curriculum on a.curr_id=curriculum.id ${sql} order by id desc limit 3 offset ${offset};`)
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
                console.log(result[0])

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

                res.render('../views/admin/review_list.html', {
                    ifEmpty,
                    reviewList: result[0],
                    totalreview: allreview[0],
                    searchPages: page_array,
                    searchCurr: allCurr[0],
                    page, srcCtg, keyword,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                });
            })
    } catch (e) { console.log(e) }
})

router.post('/review/modify_success', authAdmin, async (req, res) => {
    try {
        let { show, boardid } = req.body;
        let result = await Review.update({
            show,
        },
            {
                where: {
                    id: boardid
                }
            })
        res.redirect('/admin/review');

    }
    catch (e) {
        console.log(e);
    }
})

router.get('/review/delete', authAdmin, async (req, res) => {
    try {
        let id = req.query.id;
        await Review.destroy({
            where: { id: id }
        })
        res.redirect('/admin/review');
    } catch (error) { console.log(error) }
})

module.exports = router;