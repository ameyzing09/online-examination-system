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
    }
}

export default subjectMethod