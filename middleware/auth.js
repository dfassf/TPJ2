require('dotenv').config()
const crypto = require('crypto')

module.exports = (req, res, next) => {
    let { AccessToken } = req.cookies;
    if (AccessToken == undefined) {
        next();
    } else{
    let [header, payload, sign] = AccessToken.split('.');
    let signature = getSignature(header, payload)

    if (sign != signature) {
        console.log('invalid token');
    }
    let { userid, exp } = JSON.parse(Buffer.from(payload, 'base64').toString())
    let nexttime = new Date().getTime();
    if (nexttime > exp) {
        console.log('token has expired');
        res.clearCookie('AccessToken');
    } else{ console.log('token still valid')}
    req.userid = userid;

    next();
    }
}

function getSignature(header,payload){
    const signature = crypto.createHmac('sha256',Buffer.from(process.env.salt))
                                                       .update(header+"."+payload)
                                                       .digest('base64')
                                                       .replace('=','')
                                                       .replace('==','')
    return signature;
}