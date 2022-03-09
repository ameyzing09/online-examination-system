import teachClassMethod from "../methods/teachClassMethod"

async function getTeachClassId(payload) {
    try {
        const tsdId = await teachClassMethod.fetchOne(payload)
        return tsdId.dataValues.id
    } catch (error) {
        console.error("getTeachClassId || err ", err)
    }
}

export default { getTeachClassId }