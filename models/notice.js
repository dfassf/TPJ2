const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class Notice extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            title: { //제목
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            content: { //내용
                type: Sequelize.TEXT,
                allowNull: false
            },
            registereddate: { //신청일
                type: Sequelize.DATEONLY,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD')
                },
            },
            hit: { //조회수
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue: 1
            },
            show: { //사용자단에서 보일지 안보일지. 1: 보임 0:안보임
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Notice',
            tableName:'notice',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};