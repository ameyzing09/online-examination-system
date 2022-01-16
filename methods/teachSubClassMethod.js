import teachSubClassModel from '../model/teachSubClass'

let teachSubClassMethod = {
    fetchOne: async(option) => {
        try{
            return await teachSubClassModel.findOne({
                where: option
            })
        } catch(err) {
            console.log("teachSubClassMethod.js || fetchOne : ", err)
        }
    },

    fetchAll: async(option) => {
        try{
            return await teachSubClassModel.findAll({
                where: option
            })
        } catch(err) {
            console.log("teachSubClassMethod.js || fetchAll : ", err)
        }
    },

    create: async(payload) => {
        try{
            return await teachSubClassModel.create({
                where : payload
            })
        } catch(err) {
            console.log("teachSubClassMethod.js || create : ", err)
        }
    },

    upsert: async(payload) => {
        try{
            return await teachSubClassModel.upsert(payload)
        } catch(err) {
            console.log("teachSubClassMethod.js || upsert : ", err)
        }
    }
}

export default teachSubClassMethod


