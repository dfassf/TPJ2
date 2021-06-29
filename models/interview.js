const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class Interview extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            username: { //성명
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            content: { //내용
                type: Sequelize.TEXT,
                allowNull: false
            },
            content: { //내용
                type: Sequelize.TEXT,
                allowNull: false
            },
            curr_id: { //커리큘럼ID(curriculm의 id 연동)
                type: Sequelize.INTEGER,
                allowNull: true
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
            modelName:'Interview',
            tableName:'interview',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
