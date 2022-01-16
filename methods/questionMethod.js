import questionModel from '../model/question'

let questionMethod = {
    fetchOne: async(option) => {
        try{
            return await questionModel.findOne({
                where: option
            })
        } catch(err) {
            console.log("questionSetMethod.js || fetchOne : ", err)
        }
    },

    fetchAll: async(option) => {
        try{
            return await questionModel.findAll({
                where: option
            })
        } catch(err) {
            console.log("questionSet.js || fetchAll : ", err)
        }
    },

    create: async(payload) => {
        try{
            return await questionModel.create(payload)
        } catch(err) {
            console.log("questionSet.js || create : ", err)
        }
    },

    upsert: async(payload) => {
        try{
            return await questionModel.upsert(payload)
        } catch(err) {
            console.log("questionSet.js || upsert : ", err)
        }
    }
}

export default questionMethod


