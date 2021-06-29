require('dotenv').config();
const { sequelize, User } = require('../models/index');
const loginCheck = require('./getcookie');

module.exports = async (req, res, next) => {
    console.log('authAdmin running')
    let cookieString = req.headers.cookie;
    let loginStatus = loginCheck(cookieString);
    console.log(loginStatus)

    if (loginStatus == undefined || loginStatus == null || loginStatus == '') {
        console.log('앗')
        let json = {
            result: false,
            msg: '관리자에게만 접근 권한이 있습니다.',
            move: 'http://localhost:3000/'
        }
        res.render('../views/admincheck.html', { json })
        return 0;
    }
    else {
        let getUserType = await User.findOne({
            attributes: ['usertype'],
            where: { userid: loginStatus }
        })
        if (getUserType.dataValues.usertype == 1) {
            console.log('앗')
            let json = {
                result: false,
                msg: '관리자에게만 접근 권한이 있습니다.',
                move: 'http://localhost:3000/'
            }
            res.render('../views/admincheck.html', { json })
            return 0;
        } else if (getUserType.dataValues.usertype == 2) {
            console.log('관리자auth통과')
            next();
        }
    }
}
