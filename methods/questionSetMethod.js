import questionSetModel from '../model/questionSet'
// import teachSubClassModel from '../model/teachSubClass'

let questionSetMethod = {
    fetchOne: async(option) => {
        try{
            return await questionSetModel.findOne({
                where: option
            })
        } catch(err) {
            console.log("questionSetMethod.js || fetchOne : ", err)
        }
    },

    fetchAll: async(option) => {
        try{
            return await questionSetModel.findAll({
                where: option
            })
        } catch(err) {
            console.log("questionSet.js || fetchAll : ", err)
        }
    },

    create: async(payload) => {
        try{
            return await questionSetModel.create({
                where : payload
            })
        } catch(err) {
            console.log("questionSet.js || fetchAll : ", err)
        }
    },

    upsert: async(payload) => {
        try{
            return await questionSetModel.upsert(payload)
        } catch(err) {
            console.log("questionSet.js || upsert : ", err)
        }
    }
}

export default questionSetMethod


