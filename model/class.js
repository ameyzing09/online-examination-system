import Sequelize from 'sequelize'
import dbc from '../database'


const Class = dbc.define('class', {
    class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    class_std: {
        type: Sequelize.STRING,
        allowNull: false
    },
    class_div: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
})


export default Class