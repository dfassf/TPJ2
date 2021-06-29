const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            userid: { //유저ID
                type:Sequelize.STRING(100),
                allowNull:false,
                unique:true,
            },
            userpw: { //비밀번호
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            username: { //성명
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            gender: { //성별
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 1
              },
              userphone: { //폰번
                type: Sequelize.STRING(20),
                allowNull: true
              },
              useremail: { //메일
                type: Sequelize.STRING(50),
                allowNull: true
              },
              userdt: { //가입일
                type: Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('Y-M-D')
                }
            },
              userclass: { //수강 수업 기재
                type: Sequelize.STRING(200),
                allowNull: true,
                defaultValue:'',
              },
              usertype: { //회원 유형(1: 회원, 2:admin)
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
              },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'User',
            tableName:'user',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
