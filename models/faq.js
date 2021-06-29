const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class Faq extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            title: { //제목
                type: Sequelize.STRING(100),
                allowNull: false
            },
            content: { //내용
                type: Sequelize.TEXT,
                allowNull: false
            },
            category: { //카테고리(curriculm의 id 연동)
                type: Sequelize.INTEGER,
                allowNull: true
            },
            registereddate:{ //등록일
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('Y-M-D')
                }
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
            modelName:'Faq',
            tableName:'faq',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
