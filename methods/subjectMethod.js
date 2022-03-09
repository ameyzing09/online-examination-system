import subjectModel from '../model/subject'

let subjectMethod = {
    fetchAll: async (payload) => {
        try{
            return await subjectModel.findAll({
                where: payload
            })
        } catch(err) {
            console.log("subjectMethod.js || fetchAll : ", err)
        }
    },

    fetchOne: async(payload) => {
        try{
            return await subjectModel.findOne({
                where: payload
            })
        } catch(err) {
            console.log("subjectMethod.js || fetchOne ", err)
         }
    },

    create: async(payload) => {
        try{
            return await subjectModel.create(payload)
        } catch(err) {
            console.log("subjectMethod.js || create : ", err)
        }
    },
}

export default subjectMethod