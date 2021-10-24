import classMethod from "../methods/classMethod";

async function getClassDetails() {
    let classDetails = classMethod.getAllClass()
    let responseClassStdArray = []
    let responseClassDivArray = []

    // Class details are stored in different array
    for(let i=0; i<classDetails.length; i++) {
        responseClassStdArray[i] = classDetails[i].dataValues.class_std 
        responseClassDivArray[i] = classDetails[i].dataValues.class_div
    }

    // Filtering out duplicate values
    let responseClassStd = responseClassStdArray.filter( (item, index) => {
        if(responseClassStdArray.lastIndexOf(item) == index)
            return item
    })

    // Filtering out duplicate values
    let responseClassDiv = responseClassDivArray.filter( (item, index) => {
        if(responseClassDivArray.lastIndexOf(item) == index)
            return item
    })

    let successResponse = {
        classStd: responseClassStd,
        classDiv: responseClassDiv
    }

    return successResponse
}

async function getClassId(classDetails) {
    let classId = []
    for (let i=0; i<classDetails.length; ++i) {
        console.log(classDetails[i])
        let id = await classMethod.getClassId(classDetails[i])
    }
}

export default { getClassDetails, getClassId }