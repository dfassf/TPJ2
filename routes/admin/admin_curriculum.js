const express = require('express');
const router = express.Router();
const { sequelize, Curriculum } = require('../../models/index');
const authAdmin = require('../../middleware/authadmin');



router.get('/curr', authAdmin, async (req, res) => {
    try {
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;')

        let resultsall = await sequelize.query('select * from curriculum where ifdeleted is null;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });

        let results = await sequelize.query(`select * from curriculum where ifdeleted is null order by id desc limit 3 offset ${offset};`)
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

                res.render('../views/admin/curriculum_list.html', {
                    currList: result[0],
                    totalCurr: allCurr[0],
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
    let getthat = await Curriculum.findOne(
        // {attributes:['ifdeleted']},
        { where: { id: req.query.id } }
    )
    if (getthat.dataValues.ifdeleted == null) {
        next();
    }
    else {
        let adminDelAuth = {
            msg: '삭제된 게시물입니다.',
            move: 'http://localhost:3000/admin/curr/'
        }
        res.render('../views/logincheck.html', { adminDelAuth })
        return;
    }
}

router.get('/curr/view', authAdmin, authDelAdmin, async (req, res) => {

    try {
        let result = await Curriculum.findOne({
            where: { id: req.query.id }
        });

        
        function getDate(date){
            var year = date.getFullYear()
            var month = (1 + date.getMonth());
            month = month >= 10 ? month : '0' + month;
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day; 
            return  year + '-' + month + '-' + day;
        }
        let registeredDate = getDate(result.dataValues.registereddate)
        let startDate = getDate(result.dataValues.start_date)
        let endDate = getDate(result.dataValues.end_date)
        console.log(startDate,endDate)
        console.log(result)
        res.render('./admin/curriculum_view.html', {
            result,
            startDate,
            endDate,
            registeredDate
        });
    } catch (e) { console.log(e) }

})

router.get('/curr/search', authAdmin, async (req, res) => {
    try {

        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;')

        let bodyComb = 'and ';
        let { srcid, start_date, end_date, content, recruit, show } = req.query
        if (srcid.length > 0) {
            bodyComb += `id = ${srcid} and `
        }
        if (start_date.length > 0) {
            bodyComb += `start_date > '${start_date}' and `
        }
        if (end_date.length > 0) {
            bodyComb += `end_date < '${end_date}' and `
        }
        if (recruit.length > 0) {
            bodyComb += `recruit = ${recruit} and `
        }
        if (show.length > 0) {
            bodyComb += `\`show\` = ${show} and `
        }

        let sql = (bodyComb == 'and ') ? '' : bodyComb.substr(0, bodyComb.length - 5);
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let resultsall = await sequelize.query(`select * from curriculum where ifdeleted is null ${sql};`)
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
    
        let results = await sequelize.query(`select * from curriculum where ifdeleted is null ${sql} order by id desc limit 3 offset ${offset};`)
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

                res.render('../views/admin/curriculum_list.html', {
                    ifEmpty,
                    currList: result[0],
                    totalCurr: allCurr[0],
                    searchPages: page_array,
                    page, srcid, start_date, end_date, content, recruit, show,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                });
            })
    } catch (e) { console.log(e) }
})



router.get('/curr/add', async (req, res) => {
    try {
        res.render('../views/admin/curriculum_write.html')
    } catch (e) { console.log(e) }
})

router.post('/curr/add_success', async (req, res) => {
    try {
        let { subject, start_date, end_date, content, show } = req.body
        let result = await Curriculum.create({
            subject, start_date, end_date, content, show
        })
        res.redirect('/admin/curr')
    } catch (e) { console.log(e) }
})

router.get('/curr/modify', async (req, res) => {
    try {
        let result = await Curriculum.findOne({
            where: { id: req.query.id }
        })

        function getDate(date) {
            var year = date.getFullYear()
            var month = (1 + date.getMonth());
            month = month >= 10 ? month : '0' + month;
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day;
            return year + '-' + month + '-' + day;
        }

        let startDate = getDate(result.dataValues.start_date)
        let endDate = getDate(result.dataValues.end_date)

        res.render('../views/admin/curriculum_modify.html', {
            result,
            boardid: req.query.id,
            startDate,
            endDate
        })
    } catch (e) { console.log(e) }
})

router.post('/curr/modify_success', async (req, res) => {
    try {
        let { subject, start_date, end_date, content, show, recruit, boardid } = req.body
        let result = await Curriculum.update({
            subject, start_date, end_date, content, recruit, show
        },
            {
                where: {
                    id: boardid
                }
            })
        res.redirect(`/admin/curr/view?id=${boardid}`)
    } catch (e) { console.log(e) }
})

router.get('/curr/delete', async (req, res) => {
    try {
        let id = req.query.id;
        function getTime() {
            let ifdeleted = new Date();
            return ifdeleted;
        }

        let deletedAt = Curriculum.update({
            ifdeleted: getTime()
        },
            {
                where: {
                    id: req.query.id
                }
            })

        res.redirect('/admin/curr')
    } catch (e) {
        console.log(e)
    };
})

router.post('/curr/delete', async (req, res) => {
    try {
        let selDelItems = req.body.selDelItems
        function getTime() {
            let ifdeleted = new Date();
            return ifdeleted;
        }

        let deletedAt = Curriculum.update({
            ifdeleted: getTime()
        },
            {
                where: {
                    id: selDelItems
                }
            })
        res.redirect('/admin/curr')
    } catch (e) {
        console.log(e)
    };
})

module.exports = router;
