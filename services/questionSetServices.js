import questionSetMethod from "../methods/questionSetMethod"
import questionMethod from "../methods/questionMethod"
import answerMethod from "../methods/answerMethod"

import subjectServices from '../services/subjectServices'
import teachSubClassServices from '../services/teachSubClassServices'

async function addQuestionSet(req) {
    try {
        const subjectId = await subjectServices.getSubjectId({
            subject_name: req.body.subjectName
        })
        console.debug("subjectId ", subjectId)
        const tsdId = await teachSubClassServices.getTeachSubClassId({
            tsd_teacher_id: req.params.id,
            tsd_subject_id: subjectId.dataValues.subject_id,
            tsd_class_id: req.body.classId
        })
        console.debug("tsdId : ", tsdId)
        const questionSet = await questionSetMethod.fetchOne({ question_set_name: req.body.questionSetName })
        // console.debug("questionSetId : ", questionSetId.dataValues.question_set_id)
        let payload
        if(questionSet){
            const questionSetId = questionSet.dataValues.question_set_id
            payload = {
                question_set_id: questionSetId,
                question_set_name: req.body.questionSetName,
                tsd_id: tsdId
            }
            console.log('if payload : ', payload)
        } else {
            payload = {
                question_set_name: req.body.questionSetName,
                tsd_id: tsdId
            }
            console.log('else payload : ', payload)
        }
        // console.debug('questionSetId : ', questionSetId)
        const questionSetAdded = await questionSetMethod.upsert(payload)                    
              /*{
        questionSetName: String,
        subjectName: String,
        classId: integer,
        testQuestions: [{
            question: String,
            options: [{
                option: String,
                is_correct: boolean
            }, ...]
        }]
    }*/
    const testQuestions = req.body.testQuestions
    testQuestions.forEach(async testQuestion => {
        const question = await questionMethod.create({ question: testQuestion.question, question_set_id: questionSetAdded[0].dataValues.question_set_id } )
        testQuestion.options.forEach(async questionOption => {
            questionOption.question_id = question.dataValues.question_id
            console.debug('questionOption : ',questionOption)
            await answerMethod.create(questionOption)
        })
    })
    let response = {
        transaction: 'created'
    }
    return response
    } catch (err) {
        console.error('addQuestionSet error || ', err)
    }
}

export default { addQuestionSet }