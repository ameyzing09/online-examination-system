import subjectMethod from '../methods/subjectMethod'

async function getSubjectName() {
    let subjectName = await subjectMethod.fetchAll()
    let responseSubjectName = []

    for(let i=0; i<subjectName.length; ++i){
        responseSubjectName[i] = subjectName[i].dataValues.subject_name
    }

    console.log('subjectServices.js || getSubjectName.js : ', subjectName)

    return { subjectName: responseSubjectName }
}

async function getSubjectId(payload) {
    const subjectId = await subjectMethod.fetchOne(payload)
    return subjectId;
}

export default { getSubjectName, getSubjectId }