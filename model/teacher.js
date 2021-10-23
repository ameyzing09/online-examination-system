import Sequelize from 'sequelize'
import dbc from '../database'

const Teacher = dbc.define('teacher', {
    teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    teacher_fname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    teacher_lname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    teacher_user_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    teacher_password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})



export default Teacher
