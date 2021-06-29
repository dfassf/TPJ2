'use strict';


const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const Application = require('./application');
const Curriculum = require('./curriculum');
const Faq = require('./faq');
const Category = require('./category');
const Interview = require('./interview');
const Notice = require('./notice');
const Review = require('./review');
const User = require('./user');


const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Application = Application;
Application.init(sequelize);

db.Curriculum = Curriculum;
Curriculum.init(sequelize);

db.Faq = Faq;
Faq.init(sequelize);

db.Category = Category;
Category.init(sequelize);

db.Interview = Interview;
Interview.init(sequelize);

db.Notice = Notice;
Notice.init(sequelize);

db.Review = Review;
Review.init(sequelize);

db.User = User;
User.init(sequelize);




db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
