import Sequelize from 'sequelize'
import dbc from '../database'

const Subject = dbc.define('subject', {
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    subject_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Subject
