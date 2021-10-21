import Sequelize from 'sequelize'

const sequelize = new Sequelize('onlineexaminationsystem', 'root', 'amey', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize
