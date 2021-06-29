const express = require('express');
const router = express.Router();
const { sequelize, Faq, Category } = require('../../models/index');
const authAdmin = require('../../middleware/authadmin');

router.get('/faq', authAdmin, async (req, res) => {
    try {
        let loadData = await sequelize.query('SELECT * FROM faq AS A LEFT JOIN (select subject, id from category) AS B ON A.category=B.id;')

        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];

        let allFaq = await sequelize.query('select * from faq;');
        let allCategory = await Category.findAll({
            where: {
                ifdeleted: null,
                show: 1,
            }
        })
        let resultsall = await sequelize.query('select * from faq;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
        ;
        let results = await sequelize.query(`select a.id, title, content, category, date_format(registereddate, '%Y-%m-%d') as registereddate, a.\`show\`, category.subject from faq as a left join category on a.category = category.id order by id desc limit 3 offset ${offset};`)
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

                res.render('../views/admin/faq_list.html', {
                    faqList: result[0], //이거바꾸기
                    totalFaq: allFaq[0],  //이거바꾸기
                    searchPages: page_array,
                    ifEmpty,
                    totalCtg: allCategory,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                });
                console.log(allFaq[0])
            })
    } catch (e) { console.log(e) }
})

async function authDelAdmin(req, res, next) {
    let getthat = await Faq.findOne(
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
            move: 'http://localhost:3000/admin/faq/'
        }
        res.render('../views/logincheck.html', { adminDelAuth })
        return;
    }
}

router.get('/faq/view', authAdmin, authDelAdmin, async (req, res) => {

    try {
        let result = await Faq.findOne({
            where: { id: req.query.id }
        });

        let getCtg = await Category.findOne({
            where: { id: result.dataValues.category }
        })

        function getDate(date) {
            var year = date.getFullYear()
            var month = (1 + date.getMonth());
            month = month >= 10 ? month : '0' + month;
            var day = date.getDate();
            day = day >= 10 ? day : '0' + day;
            return year + '-' + month + '-' + day;
        }

        let date = getDate(result.dataValues.registereddate)

        res.render('./admin/faq_view.html', {
            result,
            date,
            getCtg
        });
    } catch (e) { console.log(e) }
})

router.get('/faq/search', authAdmin, async (req, res) => {
    try {

        let allFaq = await sequelize.query('select * from faq;');
        let allCategory = await Category.findAll({
            where: {
                ifdeleted: null,
                show: 1,
            }
        });

        let bodyComb = 'and ';
        let { title, start_date, end_date, category, show } = req.query


        if (title.length > 0) {
            bodyComb += `title like '%${title}%' and `
        }
        if (start_date.length > 0) {
            bodyComb += `registereddate > '${start_date}' and `
        }
        if (end_date.length > 0) {
            bodyComb += `registereddate < '${end_date}' and `
        }
        if (category.length > 0) {
            bodyComb += `category = '${category}' and `
        }
        if (show.length > 0) {
            bodyComb += `category.\`show\` = ${show} and `
        }
        let sql = (bodyComb == 'and ') ? '' : `where ${bodyComb.substr(3, bodyComb.length - 7)}`;
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];

        let resultsall = await sequelize.query(`select * from faq as a ${sql};`)
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });
        
        let results = await sequelize.query(`select a.id, title, content, category, date_format(registereddate, '%Y-%m-%d') as registereddate, a.\`show\`, category.subject from faq as a left join category on a.category = category.id ${sql} order by id desc limit 3 offset ${offset};`)
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

                res.render('../views/admin/faq_list.html', {
                    ifEmpty,
                    faqList: result[0],
                    totalFaq: allFaq[0],
                    searchPages: page_array,
                    page, start_date, end_date, category, show,
                    totalCtg: allCategory,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,

                });
            })
    } catch (e) { console.log(e) }
})

router.get('/faq/add', authAdmin, async (req, res) => {
    try {
        let loadCtg = await Category.findAll({
            where: {
                show: 1,
                ifdeleted: null,
            }
        })
        console.log(loadCtg)
        res.render('../views/admin/faq_write.html', {
            categoryList: loadCtg,
        })
    } catch (e) { console.log(e) }
})

router.post('/faq/add_success', authAdmin, async (req, res) => {
    try {
        let { title, category, content, show } = req.body
        let result = await Faq.create({
            title, category, content, show
        })
        res.redirect('/admin/faq')
        console.log('asdasd')
    } catch (e) { console.log(e) }
})

router.get('/faq/modify', authAdmin, async (req, res) => {
    try {
        let result = await Faq.findOne({
            where: { id: req.query.id }
        })
        let loadCtg = await Category.findAll({
            where: {
                show: 1,
                ifdeleted: null,
            }
        })

        let ifEmpty;
        if (loadCtg[0].length !== 0) {
            ifEmpty = false;
        } else { ifEmpty = true }

        res.render('../views/admin/faq_modify.html', {
            ifEmpty,
            result,
            boardid: req.query.id,
            categoryList: loadCtg,
        })
    } catch (e) { console.log(e) }
})

router.post('/faq/modify_success', authAdmin, async (req, res) => {
    try {

        let { title, category, content, show, boardid } = req.body
        let result = await Faq.update({
            title, category, content, show,
        },
            {
                where: {
                    id: boardid
                }
            })
        res.redirect(`/admin/faq/view?id=${boardid}`)

    } catch (e) { console.log(e) }
})

router.get('/faq/delete', authAdmin, async (req, res) => {
    try {
        let id = req.query.id;
        await Faq.destroy({
            where: { id: id }
        })
        res.redirect('/admin/faq');
    } catch (error) { console.log(error) }
})

router.post('/faq/delete', authAdmin, async (req, res) => {
    try {
        let selDelItems = req.body.selDelItems

        let deletedAt = Faq.destroy({
            where: { id: selDelItems }
        })

        res.redirect('/admin/faq')

    } catch (e) {
        console.log(e)
    };
})

module.exports = router;
