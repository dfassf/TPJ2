const express = require('express');
const router = express.Router();

const introRouter = require('./board/introduce'); 
const notiRouter = require('./board/notice');
const currRouter = require('./board/curriculum');
const joinRouter = require('./users/users');
const applyRouter = require('./board/apply');
const revRouter = require('./board/review');
const intRouter = require('./board/interview');
const faqRouter = require('./board/faq');
const applyAdminRouter = require('./admin/admin_apply');
const currAdminRouter = require('./admin/admin_curriculum');
const faqAdminRouter = require('./admin/admin_faq');
const categoryAdminRouter = require('./admin/admin_category');
const intAdminRouter = require('./admin/admin_interview');
const notiAdminRouter = require('./admin/admin_notice');
const revAdminRouter = require('./admin/admin_review');
const userAdminRouter = require('./admin/admin_user');
const mainRouter = require('./main/main');
const mainAdminRouter = require('./main/main_admin');
const auth = require('../middleware/auth')

router.use('/introduce', auth, introRouter);
router.use('/notice', auth, notiRouter)
router.use('/curr', auth, currRouter);
router.use('/user', auth, joinRouter);
router.use('/apply', auth, applyRouter);
router.use('/review', auth, revRouter);
router.use('/interview', auth, intRouter);
router.use('/faq', auth, faqRouter);
router.use('/admin', auth, applyAdminRouter);
router.use('/admin', auth, currAdminRouter);
router.use('/admin', auth, faqAdminRouter);
router.use('/admin', auth, categoryAdminRouter);
router.use('/admin', auth, intAdminRouter);
router.use('/admin', auth, notiAdminRouter);
router.use('/admin', auth, revAdminRouter);
router.use('/admin', auth, userAdminRouter);
router.use('/admin',mainAdminRouter);
router.use('/', auth , mainRouter);

module.exports = router;
