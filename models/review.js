const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class Review extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            title: { //제목
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            userid: { //유저ID/작성자
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            content: { //내용
                type: Sequelize.TEXT,
                allowNull: false
            },
            date: { //작성일
                type: Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('YY-MM-DD hh:mm:ss')
                },
            },
            hit: { //조회수
                type:Sequelize.INTEGER,
                allowNull:false,
                defaultValue: 1
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
            postpw: { //비회원용 비밀번호
                type:Sequelize.STRING(100),
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Review',
            tableName:'review',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
