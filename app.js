import { Op } from 'sequelize'
import express from 'express'
import cors from 'cors'
import dbc from './database'
import classServices from './services/classServices'
import studentModel from './model/student'
import subjectModel from './model/subject'
import classModel from './model/class'
import teacherModel from './model/teacher'

let app = express()

app.use(express.json())
app.use(cors())

// Making connection with the MYSQL database
dbc.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.log(err))

app.get('/getClass', async(req, res) => {
    let successResponse = await classServices.getClassDetails()
    res.status(200).json(successResponse)
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

app.post('/admin/addTeacher', async(req, res) => {
    let teacherUserId = req.body.fname.toLowerCase()+'.'+req.body.lname.toLowerCase()
    let teacherPassword = req.body.fname.toLowerCase()
    let teacherFname = req.body.fname
    let teacherLname = req.body.lname

    let subjectArray = []
    for( let i in req.body.subject ) {
        subjectArray.push(req.body.subject[i])
    }

    // select id from subject where subject_name='Java' or subject_name='Angular';
    let subjectDetails = await subjectModel.findAll({
        attributes: [
            'subject_id'
        ],
        where: {
            subject_name: {
                [Op.or] : [...subjectArray]
            }            
        }
    })

    let classDetails = await classServices.getClassId(req.body.class)
    // teacherModel.create({
    //     teacher_fname: teacherFname,
    //     teacher_lname: teacherLname,
    //     teacher_user_name: teacherUserId,
    //     teacher_password: teacherPassword
    // })

    let successResponse = {
        transaction: "success"
    }
    res.status(200).json(successResponse)
})

app.listen(3000, ()=> console.log('Server started at 3000'))

