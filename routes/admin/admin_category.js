const express = require('express');
const router = express.Router();
const { sequelize, Application, Curriculum, Faq, Category, Review, Notice, User } = require('../../models/index');
const getCookie = require('../../middleware/getcookie');
const authAdmin = require('../../middleware/authadmin');
const { Op } = require("sequelize");


router.get('/category', authAdmin, async (req, res) => {
    try { // 이 부분 페이지네이션하고 번호 등등 만들기
        let page = (req.query.id == undefined) ? 1 : req.query.id;
        let page2 = (req.query.pgidx == undefined) ? 1 : req.query.pgidx;
        let offset = (req.query.id == undefined) ? 0 : 3 * (page - 1);
        let page_array = [];
        let page_array2 = [];

        let allCategory = await sequelize.query('select * from category where ifdeleted is null;')

        let resultsall = await sequelize.query('select * from category where ifdeleted is null;')
            .then((resultall) => {
                let totalrecord = resultall[0].length;
                return totalrecord;
            }).catch((error) => {
                console.log(error);
            });

        let results = await sequelize.query(`select * from category where ifdeleted is null order by id desc limit 3 offset ${offset};`)
            .then((result) => {
                let total_record = result[0].length; // 76
                let view_article = 3
                let total_page = Math.ceil(resultsall / view_article); // 26

                for (i = 1; i <= total_page; i++) {
                    page_array.push(i); // 26
                    page_array2.push(i); // 26
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
                                            //      26         /   10   result : 3

                // for(let i=0; i<pageCnt;i++){
                //     big_page_array.push(page_array2.splice(0,10))
                // }
                //        2               1
                //        11              2
                //        15              2
                //        21              3
                //        20              2
                // current_page -> block_article 
                let block_arr = []
                // for(let i = 1; i<=block_article; i++){
                //     block_arr.push(i)
                // }
                //page 1  처음 페이지가 로드가되었을때 1~10까지 나와야함.
                //    10                            1~10
                //    11                            11~20
                //    15                            11~20
                //    20                            11~20
                //    21                            21~30                
                let block_start = Math.ceil(page / block) // 현재페이지가지고 내가보여줄 블럭시작점 
                let block_first = 1;
                if (block_start != 1) {
                    block_first = 1 + (block * (block_start - 1))
                }
                let block_last = block_start * block // 1~10 11~20 21~30
                if (block_last > total_page) {
                    block_last = total_page
                }

                for (let i = block_first; i <= block_last; i++) {
                    block_arr.push(i)
                }

                let nextBlock = 1 + (block * (block_start))
                if (nextBlock > total_page) nextBlock = total_page
                /*
                    1 -> 1
                    2 -> 1
                    3 -> 1
                    4 -> 1
                    5 -> 1 block 1

                    11 -> 1
                    15 -> 1
                    18 -> 1
                    19 -> 1 block 2

                    21 -> 2 block 3
                    25 -> 2

                    31 -> 3 blcok 4
                    36 -> 3
                */
                let prevBlock = ((block_start - 1) * block) - 9;
                if (prevBlock < 0) prevBlock = 1

                // 보내는 값 
                // block_arr,
                //     nextBlock,
                //     prevBlock,
                //     total_page,
                //     page,

                res.render('../views/admin/category_list.html', {
                    cateList: result[0],
                    // totalCategory:allCategory[0], 
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

router.get('/category/view', authAdmin, async (req, res) => {

    try {
        let result = await Category.findOne({
            where: { id: req.query.id }
        });

        res.render('./admin/category_view.html', {
            result,
        });
    } catch (e) { console.log(e) }

})

router.get('/category/add', authAdmin, async (req, res) => {
    try {
        res.render('../views/admin/category_write.html')
    } catch (e) { console.log(e) }
})

router.post('/category/add_success', authAdmin, async (req, res) => {
    try {
        let { subject, show } = req.body
        let result = await Category.create({
            subject, show
        })
        res.redirect('/admin/category')
    } catch (e) { console.log(e) }
})

router.get('/category/modify', authAdmin, async (req, res) => {
    try {
        let result = await Category.findOne({
            where: { id: req.query.id }
        })
        res.render('../views/admin/category_modify.html', { 
            result, 
            boardid: req.query.id
        })
    } catch (e) { console.log(e) }
})

router.post('/category/modify_success', authAdmin, async (req, res) => {
    try {
        let { subject, show, boardid } = req.body
        let result = await Category.update({
            subject, show 
        },
            {
                where: {
                    id: boardid
                }
            })
        res.redirect('/admin/category')
    } catch (e) { console.log(e) }
})

router.get('/category/delete', authAdmin, async (req, res) => {
    try {
        let id = req.query.id;
        function getTime() {
            let ifdeleted = new Date();
            return ifdeleted;
        }

        let deletedAt = Category.update({
            ifdeleted: getTime()
        },
            {
                where: {
                    id: req.query.id
                }
            })

        res.redirect('/admin/category')
    } catch (e) {
        console.log(e)
    };
})

router.post('/category/delete', authAdmin, async (req, res) => {
    try {
        let selDelItems = req.body.selDelItems
        console.log(selDelItems)
        function getTime() {
            let ifdeleted = new Date();
            return ifdeleted;
        }

        let deletedAt = Category.update({
            ifdeleted: getTime()
        },
            {
                where: {
                    id: selDelItems
                }
            })

        res.redirect('/admin/category')
    } catch (e) {
        console.log(e)
    };
})



module.exports = router;