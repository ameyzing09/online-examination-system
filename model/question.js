import Sequelize from 'sequelize'
import dbc from '../database'

import questionSetModel from '../model/questionSet'

const Question = dbc.define('question', {
    question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    question_set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: questionSetModel,
            key: 'question_set_id'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
})



export default Question
