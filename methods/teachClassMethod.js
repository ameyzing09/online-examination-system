import teachClassModel from '../model/teachClass'
import classModel from '../model/class'

let teachClassMethod = {
    fetchAll: async(option) => {
        try{
            return await teachClassModel.findAll({
                where : option,
                include: [ classModel ]
            })
        } catch(err) {
            console.log("teachClassMethod.js || fetchAll : ", err)
        }
    },

    fetchOne: async(option) => {
        try{
            return await teachClassModel.findOne({
                where: option
            })
        } catch(err) {
            console.log("teachClassMethod.js || fetchOne : ", err)
        }
    },

    create: async(payload) => {
        try{
            return await teachClassModel.create({
                where : payload
            })
        } catch(err) {
            console.log("teachClassMethod.js || create : ", err)
        }
    },

    bulkCreate: async(payload) => {
        try{
            return await teachClassModel.bulkCreate(payload)
        } catch(err) {
            console.log("teachClassMethod.js || bulkCreate : ", err)
        }
    },
    upsert: async(payload) => {
        try{
            return await teachClassModel.upsert(payload)
        } catch(err) {
            console.log("teachClassMethod.js || upsert : ", err)
        }
    }
}

export default teachClassMethod


