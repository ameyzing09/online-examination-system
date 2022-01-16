import teachSubClassMethod from "../methods/teachSubClassMethod"

async function getTeachSubClassId(payload) {
    try {
        const tsdId = await teachSubClassMethod.fetchOne(payload)
        return tsdId.dataValues.tsd_id
    } catch (error) {
        console.error("getTeachSubClassId || err ", err)
    }
}

export default { getTeachSubClassId }