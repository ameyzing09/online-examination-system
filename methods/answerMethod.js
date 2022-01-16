import answerModel from '../model/answer'

let answerMethod = {
    fetchOne: async(option) => {
        try{
            return await answerModel.findOne({
                where: option
            })
        } catch(err) {
            console.log("questionSetMethod.js || fetchOne : ", err)
        }
    },

    fetchAll: async(option) => {
        try{
            return await answerModel.findAll({
                where: option
            })
        } catch(err) {
            console.log("questionSet.js || fetchAll : ", err)
        }
    },

    create: async(payload) => {
        try{
            return await answerModel.create(payload)
        } catch(err) {
            console.log("questionSet.js || fetchAll : ", err)
        }
    },

    upsert: async(payload) => {
        try{
            return await answerModel.upsert(payload)
        } catch(err) {
            console.log("questionSet.js || upsert : ", err)
        }
    }
}

export default answerMethod


