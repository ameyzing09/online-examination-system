import Sequelize from 'sequelize'
import dbc from '../database'

import subjectModel from './subject'
import teachClassModel from './teachClass'

const teachSubClass = dbc.define('teach_sub_class', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
},{
    freezeTableName: true,
    timestamps: false
})

teachClassModel.belongsToMany(subjectModel, { through: teachSubClass, foreignKey: 'teach_class_id', otherKey: 'subject_id' })
subjectModel.belongsToMany(teachClassModel, { through: teachSubClass, foreignKey: 'subject_id', otherKey: 'teach_class_id' })

teachClassModel.hasMany(teachSubClass, { foreignKey: 'teach_class_id' })
subjectModel.hasMany(teachSubClass, { foreignKey: 'subject_id' })

teachSubClass.belongsTo(teachClassModel, { foreignKey: 'teach_class_id' })
teachSubClass.belongsTo(subjectModel, { foreignKey: 'subject_id' })

// teachSubClass.sync({ force: true })

export default teachSubClass

