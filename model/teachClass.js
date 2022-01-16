import Sequelize from 'sequelize'
import dbc from '../database'

import teacherModel from './teacher'
import classModel from './class'

const teachClass = dbc.define('teach_class', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    freezeTableName: true,
    timestamps: false
})

teacherModel.belongsToMany(classModel, { through: teachClass, foreignKey: 'teacher_id', otherKey: 'class_id' })
classModel.belongsToMany(teacherModel, { through: teachClass, foreignKey: 'class_id', otherKey: 'teacher_id'})

teacherModel.hasMany(teachClass, { foreignKey: 'teacher_id' })
classModel.hasMany(teachClass, { foreignKey: 'class_id' })

teachClass.belongsTo(teacherModel, { foreignKey: 'teacher_id' })
teachClass.belongsTo(classModel, { foreignKey: 'class_id' })

// teachClass.sync({ force: true })
export default teachClass