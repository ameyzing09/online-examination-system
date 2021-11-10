import classMethod from "../methods/classMethod";

async function getClassDetails() {
    let classDetails = await classMethod.getAllClass()
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

async function getClassId(classStd, classDiv) {
    let id = await classMethod.getClassIdMethod(classStd, classDiv)
    return id.dataValues.class_id
}


export default { getClassDetails, getClassId }