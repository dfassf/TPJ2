const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class Application extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            username: { //성명, 
                type:Sequelize.TEXT,
                allowNull:false,
            },
            gender: { //성별
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
            userage: { //나이
                type: Sequelize.INTEGER,
                allowNull: false
            },
            useremail: { //메일
                type: Sequelize.STRING(50),
                allowNull: true
            },
            date: { //신청일
                type: Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('Y-M-D')
                },
            },
            userphone: { //폰번
                type: Sequelize.STRING(20),
                allowNull: true
            },
            content: { //내용
                type: Sequelize.TEXT,
                allowNull: false
            },
            curr_id: { //커리큘럼ID(curriculm의 id 연동)
                type: Sequelize.INTEGER,
                allowNull: true
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Application',
            tableName:'application',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};