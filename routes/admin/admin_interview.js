const express = require('express');
const router = express.Router();
const { sequelize, Interview, } = require('../../models/index');
const authAdmin = require('../../middleware/authadmin');

router.get('/interview', authAdmin, async (req, res) => {
    try {
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;')

        let allinterview = await sequelize.query('select * from interview;')

        console.log('올인', allinterview[0])

        let resultsall = await sequelize.query('select * from interview;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
        let results = await sequelize.query(`select a.id, a.username, a.content, curr_id, a.\`show\`, curriculum.subject from interview as a left join curriculum on a.curr_id=curriculum.id order by id desc limit 3 offset ${offset};`)
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

                res.render('../views/admin/interview_list.html', {
                    interviewList: result[0], //이거바꾸기
                    totalinterview: allinterview[0],  //이거바꾸기
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
    let getthat = await Interview.findOne(
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
            move: 'http://localhost:3000/admin/Interview/'
        }
        res.render('../views/logincheck.html', { adminDelAuth })
        return;
    }
}

router.get('/interview/view', authAdmin, authDelAdmin, async (req, res) => {

    try {
        let results = await sequelize.query(`select a.id, curr_id, curriculum.subject, a.username, a.content, a.\`show\` from interview as a left join curriculum on a.curr_id=curriculum.id where a.id=${req.query.id}`)
            .then((result) => {
                res.render('../views/admin/interview_view.html', {
                    interviewList: result[0],
                });
            })
    } catch (e) { console.log(e) }

})

router.get('/interview/search', authAdmin, async (req, res) => {
    try {
        let allinterview = await sequelize.query('select * from interview;')
        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;')
        let bodyComb = 'and ';
        let { curr_id, username, show } = req.query;
        if (curr_id.length > 0) {
            bodyComb += `curr_id = '${curr_id}' and `
        }
        if (username != '') {
            bodyComb += `username like '%${username}%' and `
        }
        if (show.length > 0) {
            bodyComb += `a.\`show\` = ${show} and `
        }
        let sql = (bodyComb == 'and ') ? '' : `where ${bodyComb.substr(3, bodyComb.length - 7)}`;
        
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = ( req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];

        let resultsall = await sequelize.query(`select * from interview as a ${sql};`)
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });

        let results = await sequelize.query(`select a.id, a.username, a.content, curr_id, a.\`show\`, curriculum.subject from interview as a left join curriculum on a.curr_id=curriculum.id ${sql} order by id desc limit 3 offset ${offset};`)
            .then((result) => {
                console.log('리설츠',result)
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

                res.render('../views/admin/interview_list.html', {
                    ifEmpty,
                    interviewList: result[0],
                    totalinterview: allinterview[0],
                    searchPages: page_array,
                    searchCurr: allCurr[0],
                    page, curr_id, username, show,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                });
            })

    } catch (e) { console.log(e) }
})


router.get('/interview/add', authAdmin, async (req, res) => {
    try {
        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;')

        res.render('../views/admin/interview_write.html', {
            totalCurr: allCurr[0],
        })
    }
    catch (e) {
        console.log(e)
    }
})

router.post('/interview/add_success', authAdmin, async (req, res) => {
    try {
        let { username, content, curr_id, show } = req.body;

        console.log('req.body : ', req.body);
        console.log('add create 접근중');

        let result = await Interview.create({
            username, content, curr_id, show
        })

        console.log('add create 접근완료');

        res.redirect('/admin/interview');
    }
    catch (e) {
        console.log(e);
    }
})

router.get('/interview/modify', authAdmin, async (req, res) => {
    try {
        console.log('interview_modify 접근중');

        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;');
        let results = await sequelize.query(`select a.id, curr_id, curriculum.subject, a.username, a.content, a.\`show\` from interview as a left join curriculum on a.curr_id=curriculum.id where a.id=${req.query.id}`)
            .then((result) => {
                console.log('results[0] : ', result[0]);
                res.render('../views/admin/interview_modify.html', {
                    interviewList: result[0],
                    totalCurr: allCurr[0],
                });
            })
    } catch (e) {
        console.log(e);
    }
})

router.post('/interview/modify_success', authAdmin, async (req, res) => {
    try {
        let { curr_id, username, content, show, boardid } = req.body
        let result = await Interview.update({
            curr_id, username, content, show,
        },
            {
                where: {
                    id: boardid,
                }
            })
        res.redirect(`/admin/interview/view?id=${boardid}`)
        console.log(result)
    } catch (e) { console.log(e) }
})

router.get('/interview/delete', authAdmin, async (req, res) => {
    try {
        let id = req.query.id;
        await Interview.destroy({
            where: { id: id }
        })
        res.redirect('/admin/interview');
    } catch (error) { console.log(error) }
})

router.post('/interview/delete', authAdmin, async (req, res) => {
    try {
        let selDelItems = req.body.selDelItems
        console.log(selDelItems)

        let deletedAt = Interview.destroy({
            where: { id: selDelItems }
        })

        res.redirect('/admin/interview')

    } catch (e) {
        console.log(e)
    };
})

module.exports = router;