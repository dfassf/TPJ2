const Sequelize = require('sequelize');
const moment = require('moment');


module.exports = class Category extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            subject: { //카테고리명
                type: Sequelize.STRING(50),
                allowNull: false
            },            
            show: { //사용자단에서 보일지 안보일지. 1: 보임 0:안보임
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
            ifdeleted: { //작성일
                type: Sequelize.DATE,
                allowNull:true,
                get: function(){
                    return moment(this.getDataValue('date')).format('Y-M-D')
                },
            },
        }
        ,{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Category',
            tableName:'category',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
