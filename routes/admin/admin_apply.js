const express = require('express');
const router = express.Router();
const { sequelize, Application, Curriculum } = require('../../models/index');
const authAdmin = require('../../middleware/authadmin');

router.get('/apply', authAdmin, async (req, res) => {
    try {
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;');
        let allapply = await sequelize.query('select * from application;');
        let resultsall = await sequelize.query('select * from application;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });

        let results = await sequelize.query(`select curr_id, a.id, a.username, a.gender, a.userage, a.userphone, a.content, date_format(date, '%Y-%m-%d') as date, curriculum.subject from application as a left join curriculum on a.curr_id=curriculum.id order by id desc limit 3 offset ${offset};`)
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

                let ifEmpty; //데이터가 없을 경우 nunjucks로 별도 내용 출력
                if (result[0].length !== 0) {
                    ifEmpty = false;
                } else { ifEmpty = true };

                //paging of pages
                let block = 10;
                let block_article = Math.ceil(page_array.length / block);
                let block_arr = [];
                let block_start = Math.ceil(page / block);
                let block_first = 1;
                if (block_start != 1) {
                    block_first = 1 + (block * (block_start - 1));
                }
                let block_last = block_start * block;
                if (block_last > total_page) {
                    block_last = total_page;
                }

                for (let i = block_first; i <= block_last; i++) {
                    block_arr.push(i);
                }

                let nextBlock = 1 + (block * (block_start));
                if (nextBlock > total_page) nextBlock = total_page;

                let prevBlock = ((block_start - 1) * block) - 9;
                if (prevBlock < 0) prevBlock = 1;

                res.render('../views/admin/apply_list.html', {
                    applyList: result[0], //이거바꾸기
                    totalapply: allapply[0],  //이거바꾸기
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
    } catch(e){console.log(e)};
})

//삭제된 게시물 접근 거부
async function authDelAdmin(req, res, next) {
    let getthat = await Application.findOne(
        {
            where: { id: req.query.id }
        })

    if (getthat.dataValues.ifdeleted == null) {
        next();
    }
    else {
        let adminDelAuth = {
            msg: '삭제된 게시물입니다.',
            move: 'http://localhost:3000/admin/apply/',
        }
        res.render('../views/logincheck.html', { adminDelAuth });
        return;
    }
}

router.get('/apply/view', authAdmin, authDelAdmin, async (req, res) => {
    try {
        let results = await sequelize.query(`select a.id, a.username, a.gender, a.userage, a.useremail, a.userphone, a.content, date_format(date, '%Y-%m-%d') as date, curr_id, curriculum.subject from application as a left join curriculum on a.curr_id=curriculum.id where a.id=${req.query.id}`)
            .then((result) => {
                res.render('../views/admin/apply_view.html', {
                    applyList: result[0],
                });
            })
    }
    catch (e) {
        console.log(e);
    }
})

router.get('/apply/search', authAdmin, async (req, res) => {
    try {
        let allapply = await sequelize.query('select * from application;');
        let allCurr = await sequelize.query('select * from curriculum where ifdeleted is null;');

        // 쿼리문 직접 추출
        let bodyComb = 'and ';
        let { curr_id, username, start_date, end_date } = req.query;
        if (curr_id.length > 0) {
            bodyComb += `curr_id = '${curr_id}' and `;
        }
        if (username != '') {
            bodyComb += `username like '%${username}%' and `;
        }
        if (start_date.length > 0) {
            bodyComb += `date > '${start_date}' and `;
        }
        if (end_date.length > 0) {
            bodyComb += `date < '${end_date}' and `;
        }

        let sql = (bodyComb == 'and ') ? '' : `where ${bodyComb.substr(3, bodyComb.length - 7)}`;
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];

        let resultsall = await sequelize.query(`select * from application ${sql};`)
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });

        let currCurr = await Curriculum.findOne({
            attributes: ['id', 'subject'],
            where: { id: curr_id },
        })

        // 검색
        let results = await sequelize.query(`select a.id, a.username, date_format(date, '%Y-%m-%d') as date, curr_id, curriculum.subject from application as a left join curriculum on a.curr_id=curriculum.id ${sql} order by id desc limit 3 offset ${offset};`)
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
                let block_last = block_start * block;
                if (block_last > total_page) {
                    block_last = total_page;
                }

                for (let i = block_first; i <= block_last; i++) {
                    block_arr.push(i);
                }
                let nextBlock = 1 + (block * (block_start));
                if (nextBlock > total_page) nextBlock = total_page
                let prevBlock = ((block_start - 1) * block) - 9;
                if (prevBlock < 0) prevBlock = 1

                res.render('../views/admin/apply_list.html', {
                    ifEmpty,
                    applyList: result[0],
                    totalapply: allapply[0],
                    searchPages: page_array,
                    searchCurr: allCurr[0],
                    page, curr_id, username, start_date, end_date,
                    block_arr,
                    nextBlock,
                    prevBlock,
                    total_page,
                    page,
                });
            })

    } catch (e) { console.log(e) }
})

router.get('/apply/delete', authAdmin, async (req, res) => {
    try {
        let id = req.query.id;
        await Application.destroy({
            where: { id: id }
        })
        res.redirect('/admin/apply');
    } catch (error) { console.log(error) }
})

router.post('/apply/delete', authAdmin, async (req, res) => {
    try {
        let selDelItems = req.body.selDelItems
        let deletedAt = Application.destroy({
            where: { id: selDelItems }
        })
        res.redirect('/admin/apply')
    } catch (e) {
        console.log(e)
    };
})

module.exports = router;