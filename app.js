// Utility
import { Op } from 'sequelize'
import express from 'express'
import cors from 'cors'

// Database connection
import dbc from './database'

// Services
import classServices from './services/classServices'
import subjectServices from './services/subjectServices'
import questionSetServices from './services/questionSetServices'

// Models
import studentModel from './model/student'
import subjectModel from './model/subject'
import classModel from './model/class'
import teacherModel from './model/teacher'


// Methods
import teacherClassMethod from './methods/teachClassMethod'
import teachSubClassMethod from './methods/teachSubClassMethod'
import subjectMethod from './methods/subjectMethod'
import classMethod from './methods/classMethod'

let app = express()

app.use(express.json())
app.use(cors())

// Making connection with the MYSQL database
dbc.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.log(err))

// Get teacher count API
app.get('/getTeacherCount', async(req, res) => {
    const teacherCount = await teacherModel.findAndCountAll()
    let successResponse = {
        teacherCount: teacherCount.count
    }
    res.status(200).json(successResponse)
})

// Get student count API
app.get('/getStudentCount',async(req, res) => {
    const studentCount = await studentModel.findAndCountAll()
    let successResponse = {
        studentCount: studentCount.count
    }
    res.status(200).json(successResponse)
})

// Get class details API
app.get('/getClass', async(req, res) => {
    let successResponse = await classServices.getClassDetails()
    res.status(200).json(successResponse)
})

// Get subject name API
app.get('/getSubject', async(req, res) => {
    let successResponse = await subjectServices.getSubjectName()
    res.status(200).json(successResponse)
})

// Get class ID
app.post('/getClassId', async(req, res) => {
    let classStd = req.body.classStd
    let classDiv = req.body.classDiv

    let classId = await classServices.getClassId(classStd, classDiv)
    res.status(200).json({ classId })
})

// Student Registration API
app.post('/studentRegistration', async (req, res) => {
    /* Finding all available class std and div to get the class id from the
    class table to enter in the student table.*/
    let classDetails = await classModel.findAll({
        where: {
            class_std: req.body.requestBody.classStd,
            class_div: req.body.requestBody.classDiv
        }
    })

    // Above function returns the class_id
    let classId = classDetails[0].dataValues.class_id

    // Inserting record in the student table
    studentModel.create({
        student_fname: req.body.requestBody.studentFname,
        student_mname: req.body.requestBody.studentMname,
        student_lname: req.body.requestBody.studentLname,
        c_id: classId
    })

    let successResponse = {
        transaction: "success"
    }
    
    // Sending response
    res.status(200).json(successResponse)
})

// Create teacher API
app.post('/admin/addTeacher', async(req, res) => {
    let teacherUserId = req.body.fname.toLowerCase()+'.'+req.body.lname.toLowerCase()
    let teacherPassword = req.body.fname.toLowerCase()
    let teacherFname = req.body.fname
    let teacherLname = req.body.lname
    let subjectDetails, subjectList = []
    const { teachingDetails } = req.body
    // for( let i in req.body.subject ) {
    //     subjectArray.push(req.body.subject[i])
    // }
    // Inserting record in teacher table
    const [ teacher, created ] = await teacherModel.findOrCreate({
        where : {
            teacher_fname: teacherFname,
            teacher_lname: teacherLname
        },
        defaults: {
            teacher_user_name: teacherUserId,
            teacher_password: teacherPassword
        }
    })

    console.log('app.js || teacher id : ', teacher.dataValues.teacher_id)

    let teacherClassData = []
    for( let i=0; i<teachingDetails.length; ++i ){
        teacherClassData.push({ 
            "teacher_id": teacher.dataValues.teacher_id, 
            "class_id": teachingDetails[i].classId
        })
        subjectList.push(teachingDetails[i].subjectName)
    }
    // select id from subject where subject_name='Java' or subject_name='Angular';
    subjectDetails = await subjectModel.findAll({
        attributes: [
            'subject_id'
        ],
        where: {
            subject_name: {
                [Op.or] : [...subjectList]
            }            
        }
    })

    // Inserting record in teacherClass table
    await teacherClassMethod.bulkCreate(teacherClassData)

    // Fetching teacherClass ID  for inserting into teachSubClass table
    const teacherClassList = await teacherClassMethod.fetchAll({ [Op.or]: [ ...teacherClassData ] })
    console.info('teacherList ', teacherClassList)
    
    const teacherClassIds = teacherClassList.map(({ id }) => {
        console.info('teacherClassIds : ', id)
        return id;
    })

    const subjectIds = subjectDetails.map(({ subject_id : id }) => {
        console.info('subjectIds : ', id)
        return id;
    })

    // Adding values to teachSubClass table
    for(let i in teacherClassIds) {
        await teachSubClassMethod.create({
            teach_class_id: teacherClassIds[i],
            subject_id: subjectIds[i]
        })
    }
    let successResponse = {
        transaction: "success"
    }
    res.status(200).json(successResponse)
})

// Get teacher names API
app.get('/getTeacher', async (req, res) => {
    let teacherDetails = await teacherModel.findAll({
        attributes: [ 'teacher_id', 'teacher_fname', 'teacher_lname' ]
    })
    console.log('app.js || getTeacherDetails ', teacherDetails)
    res.status(200).json(teacherDetails)
})

// Edit teacher details API
app.put('/admin/:id', async (req, res) => {
    let teacherId = req.params.id
    teacherModel.update(req.body, {
        where: {
            teacher_id: teacherId
        }
    })

    let successResponse = {
        transaction: "success"
    }

    res.status(200).json(successResponse)
})

// Delete teacher details
app.delete('/admin/:id', async (req, res) => {
    let teacherId = req.params.id
    teacherModel.destroy({
        where:{
            teacher_id: teacherId
        }
    })

    let successResponse = {
        transaction: "success"
    }

    res.status(200).json(successResponse)
})

app.post('/admin/addSubject', async (req, res) => {
    let { subjectName } = req.body
    const subjectId = await subjectMethod.create({ subject_name: subjectName })
    res.status(200).json(subjectId)
})

app.post('/admin/addClass', async (req, res) => {
    let { classStd, classDiv } = req.body
    const classId = await classMethod.create({ class_std: classStd, class_div: classDiv })
    res.status(200).json(classId)
})

// Add question API
app.post('/teacher/:id/addQuestion', async(req, res) => {
    /*{
        questionSetName: String,
        subjectName: String,
        classId: integer,
        testQuestion: [{
            question: String,
            options: [{
                option: String,
                is_correct: boolean
            }, ...]
            multiAnswer: boolean
        }]
    }*/
    const addedQuestion = await questionSetServices.addQuestionSet(req)
    console.log("addedQuestion ", addedQuestion)
    res.status(200).json(addedQuestion)
})

app.listen(process.env.PORT, ()=> console.log(`Server started at ${process.env.PORT}`))

