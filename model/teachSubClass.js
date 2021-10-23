import Sequelize from 'sequelize'
import dbc from '../database'
import teacherModel from './teacher'
import subjectModel from './subject'
import classModel from './class'

const teachSubClass = dbc.define('teach_sub_class', {
    tsd_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    }
},{
    freezeTableName: true,
    timestamps: false
})

teacherModel.belongsToMany(subjectModel, { through: teachSubClass })
classModel.belongsToMany(teacherModel, {throughL teachSubClass })

export default teachSubClass

