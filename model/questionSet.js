import Sequelize from 'sequelize'
import dbc from '../database'

import teacherSubClassModel from '../model/teachSubClass'

const questionSet = dbc.define('question_set', {
    question_set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    question_set_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tsd_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: teacherSubClassModel,
            key: 'tsd_id'
        }
    },
}, {
    freezeTableName: true,
    timestamps: false
})

export default questionSet
