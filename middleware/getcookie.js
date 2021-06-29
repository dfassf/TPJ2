const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

function getCookie(cookie) {
    if (cookie == undefined || cookie == null || cookie == '') {
        return 0;
    } else {
        let cookieArr2 = [];
        let cookieArr = cookie.split(';');
        cookieArr.forEach(v => {
            let [name, value] = v.split('=')
            
            if (name.trim() == 'AccessToken') {

                let jwt = value.split('.')
                let payload = Buffer.from(jwt[1], 'base64').toString()
                let { userid } = JSON.parse(payload)
                id = userid;
                cookieArr2.push(JSON.parse(payload).userid)
            }
        })
        return cookieArr2[0]
    }
}

module.exports = getCookie
