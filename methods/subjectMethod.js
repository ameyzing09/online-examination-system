import subjectModel from '../model/subject'

let subjectMethod = {
    getSubject: async () => {
        try{
            return await subjectModel.findAll()
        } catch(err) {
            console.log("subjectMethod.js || getSubject : ", err)
        }
    }
}

export default subjectMethod