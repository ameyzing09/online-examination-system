import Sequelize from 'sequelize'
import dbc from '../database'

import questionModel from './question'

const Answer = dbc.define('answer', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    question_id: {
        type: Sequelize.INTEGER,
        references: {
            model: questionModel,
            key: 'question_id'
        }
    },
    is_correct: {
        type: Sequelize.TINYINT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

export default Answer
