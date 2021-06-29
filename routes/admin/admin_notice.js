const express = require('express');
const router = express.Router();
const { sequelize, Notice } = require('../../models/index')
const authAdmin = require('../../middleware/authadmin');


router.get('/notice', authAdmin, async (req, res) => {
    try {
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];

        let allnotice = await sequelize.query('select * from notice;')

        let resultsall = await sequelize.query('select * from notice;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });

        let results = await sequelize.query(`select id, title, content, date_format(registereddate, '%Y-%m-%d') as registereddate, hit, \`show\` from notice order by id desc limit 3 offset ${offset};`)
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

                res.render('../views/admin/notice_list.html', {
                    noticeList: result[0],
                    totalnotice: allnotice[0], 
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
    let getthat = await Notice.findOne(
        // {attributes:['ifdeleted']},
        { where: { id: req.query.id } }
    )
    if (getthat.dataValues.ifdeleted == null) {
        next();
    }
    else {
        console.log('deleted DB')
        let adminDelAuth = {
            msg: '삭제된 게시물입니다.',
            move: 'http://localhost:3000/admin/notice/'
        }
        res.render('../views/logincheck.html', { adminDelAuth })
        return;
    }
}

router.get('/notice/view', authAdmin, authDelAdmin, async (req, res) => {
    try {
        let result = await Notice.findOne({
            where: { id: req.query.id }
        });
        res.render('./admin/notice_view.html', {
            result,
        });
    } catch (e) { console.log(e) }

})

router.get('/notice/search', authAdmin, async (req, res) => {
    try {
        let allnotice = await sequelize.query('select * from notice;')
        let bodyComb = 'and ';
        let { title, show, start_date, end_date } = req.query;
        if (title.length > 0) {
            bodyComb += `title like '%${title}%' and `
        }
        if (show.length > 0) {
            bodyComb += `\`show\` = ${show} and `
        }
        if (start_date.length > 0) {
            bodyComb += `registereddate > '${start_date}' and `
        }
        if (end_date.length > 0) {
            bodyComb += `registereddate < '${end_date}' and `
        }
        let sql = (bodyComb == 'and ') ? '' : `where ${bodyComb.substr(3, bodyComb.length - 7)}`;
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];

        let resultsall = await sequelize.query(`select * from notice ${sql};`)
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });

        let results = await sequelize.query(`select id, title, content, hit, date_format(registereddate, '%Y-%m-%d') as registereddate, \`show\` from notice ${sql} order by id desc limit 3 offset ${offset};`)
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
                if (nextBlock > total_page) nextBlock = total_page;
                let prevBlock = ((block_start - 1) * block) - 9;
                if (prevBlock < 0) prevBlock = 1

                res.render('../views/admin/notice_list.html', {
                    ifEmpty,
                    noticeList: result[0],
                    totalnotice: allnotice[0],
                    searchPages: page_array,
                    title, page, start_date, end_date, show,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                });
            })
    } catch (e) { console.log(e) }
})

router.get('/notice/add', authAdmin, async (req, res) => {
    try {
        res.render('../views/admin/notice_write.html');
    } catch (e) { console.log(e) }
})

router.post('/notice/add_success', authAdmin, async (req, res) => {
    try {
        let { title, content, show } = req.body;
        let result = await Notice.create({
            title, content, show,
        })
        res.redirect('/admin/notice');
    }
    catch (e) {
        console.log(e);
    }
})

router.get('/notice/modify', authAdmin, async (req, res) => {
    try {
        let result = await Notice.findOne({
            where: { id: req.query.id }
        })

        res.render('../views/admin/notice_modify.html', {
            result, 
            boardid: req.query.id,
        })
    } catch (e) { console.log(e) }
})

router.post('/notice/modify_success', authAdmin, async (req, res) => {
    try {
        console.log('modify_success 접근중');

        let { title, content, show, boardid } = req.body;
        let result = await Notice.update({
            title, content, show,
        },
            {
                where: {
                    id: boardid
                }
            })
        res.redirect(`/admin/notice/view?id=${boardid}`)
    }
    catch (e) {
        console.log(e);
    }
})

router.get('/notice/delete', authAdmin, async (req, res) => {
    try {
        let id = req.query.id;
        await Notice.destroy({
            where: { id: id }
        })
        res.redirect('/admin/notice');
    } catch (error) { console.log(error) }
})

router.post('/notice/delete', authAdmin, async (req, res) => {
    try {
        let selDelItems = req.body.selDelItems;
        let deletedAt = Notice.destroy({
            where: { id: selDelItems }
        })
        res.redirect('/admin/notice')
    } catch (e) {
        console.log(e)
    };
})

module.exports = router;
