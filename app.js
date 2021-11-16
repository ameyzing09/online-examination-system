import { Op } from 'sequelize'
import express from 'express'
import cors from 'cors'
import dbc from './database'
import classServices from './services/classServices'
import studentModel from './model/student'
import subjectModel from './model/subject'
import classModel from './model/class'
import teacherModel from './model/teacher'
import teacherSubClass from './model/teachSubClass'

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

app.get('/getClass', async(req, res) => {
    let successResponse = await classServices.getClassDetails()
    res.status(200).json(successResponse)
})

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
app.post('/admin', async(req, res) => {
    let teacherUserId = req.body.fname.toLowerCase()+'.'+req.body.lname.toLowerCase()
    let teacherPassword = req.body.fname.toLowerCase()
    let teacherFname = req.body.fname
    let teacherLname = req.body.lname
    let flag = true
    if(req.body.subject.length != req.body.class.length)
        flag = false

    let subjectDetails
    let subjectArray = []
    if(flag){
        for( let i in req.body.subject ) {
            subjectArray.push(req.body.subject[i])
        }
        // select id from subject where subject_name='Java' or subject_name='Angular';
        subjectDetails = await subjectModel.findAll({
            attributes: [
                'subject_id'
            ],
            where: {
                subject_name: {
                    [Op.or] : [...subjectArray]
                }            
            }
        })
    }
    console.log('app.js || subjectDetails : ', subjectDetails)

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

    let teacherData = []

    for( let i=0; i<subjectArray.length; ++i ){
        teacherData.push({ 
            "tsd_teacher_id": teacher.dataValues.teacher_id, 
            "tsd_subject_id": subjectDetails[i].dataValues.subject_id,
            "tsd_class_id": req.body.class[i]
        })
    }

    console.log('app.js || teach_sub_class : ', ...teacherData)
    teacherSubClass.bulkCreate(teacherData)
    let successResponse = {
        transaction: "success"
    }
    res.status(200).json(successResponse)
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

app.listen(3000, ()=> console.log('Server started at 3000'))

