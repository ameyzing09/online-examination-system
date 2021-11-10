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
    },
    tsd_teacher_id: {
        type: Sequelize.INTEGER,
        references: {
            model: teacherModel,
            key: 'teacher_id'
        }
    },
    tsd_subject_id: {
        type: Sequelize.INTEGER,
        references: {
            model: subjectModel,
            key: 'subject_id'
        }
    },
    tsd_class_id: {
        type: Sequelize.INTEGER,
        references: {
            model: classModel,
            key: 'class_id'
        }
    }
},{
    freezeTableName: true,
    timestamps: false
})

teacherModel.belongsToMany(teacherModel, { 
    through: teachSubClass, 
    as: 'tsd_teacher_id',
    foreignKey: 'teacher_id'
 })
subjectModel.belongsToMany(subjectModel, { 
    through: teachSubClass,
    as: 'tsd_subject_id',
    foreignKey: 'subject_id'
})
classModel.belongsToMany(classModel, { 
    through: teachSubClass,
    as: 'tsd_class_id',
    foreignKey: 'class_id'
})

export default teachSubClass

