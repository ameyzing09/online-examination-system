import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
})

export default sequelize
