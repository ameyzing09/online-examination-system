import Sequelize from 'sequelize'
import dbc from '../database'
import classModel from './class'

const Student = dbc.define('student', {
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    student_fname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    student_mname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    student_lname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    c_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Student.hasOne(classModel, { foreignKey: { allowNull: false, name: 'class_id' }})

export default Student