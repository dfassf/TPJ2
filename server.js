const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');
const PORT = '3000';
const path = require('path')
const cookieParser = require('cookie-parser');

app.use(cors());
require('dotenv').config({ path: path.join(__dirname, '.env') })

app.use(cookieParser());
const { sequelize } = require('./models');
const { curriculum } = require('./models');
const router = require('./routes/index');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
});

app.use(cors());

app.use(session({
    secret: 'aaa',
    resave: false,
    saveUninitialized: true,
}));

sequelize.sync({ force: false, })
    .then(() => {
        console.log('access successful')
    }).catch(() => {
        console.log('access failed')
    })

app.use('/', router)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})
