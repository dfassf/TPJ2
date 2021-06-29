const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class Curriculum extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            subject: { //제목
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            start_date: { //강의 시작일
                type: Sequelize.DATEONLY,
                allowNull:false,
                get: function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD')
                }
            },
            end_date: { //강의 종료일
                type: Sequelize.DATEONLY,
                allowNull:false,
                get: function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD')
                }
            },
            registereddate:{ //등록일
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD hh:mm:ss')
                }
            },
            content: { //강의 내용
                type:Sequelize.TEXT,
                allowNull:true,
            },            
            recruit: { //모집중인지 확인. 1:모집중 0:마감
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
            show: { //사용자단에서 보일지 안보일지. 1: 보임 0:안보임
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
            ifdeleted: { //삭제시점
                type: Sequelize.DATE,
                allowNull:true,
                get: function(){
                    return moment(this.getDataValue('date')).format('YYYY-MM-DD hh:mm:ss')
                },
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Curriculum',
            tableName:'curriculum',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
