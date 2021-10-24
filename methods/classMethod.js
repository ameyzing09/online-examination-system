import Sequelize from 'sequelize'
import classModel from '../model/class'

let classMethod = {
    getAllClass: async() => {
        try{
            return await classModel.findAll()
        } catch { (err => console.log(err)) }
    },
    getClassId: async(classInfo) => {
        try{
            return await classModel.findAll({
                attribute:[ 
                    'class_id'
                ],
                [Op.and] : [
                    { 
                        class_std: classInfo.classStd,
                        class_div: classInfo.classDiv
                    }
                ]
            })
        } catch { ( err => console.log(err)) }
    }
}

export default classMethod