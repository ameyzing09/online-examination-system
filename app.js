import express from 'express'
import cors from 'cors'
import dbc from './database'
import studentModel from './student'
import classModel from './class'
let app = express()

app.use(express.json())
app.use(cors())

// Making connection with the MYSQL database
dbc.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.log(err))

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

app.get('/getClass', async(req, res) => {
    // select * from class;
    let classDetails = await classModel.findAll()
    console.log(classDetails)
    let responseClassStdArray = []
    let responseClassDivArray = []
    // Class details are stored in different array
    for(let i=0; i<classDetails.length; i++) {
        responseClassStdArray[i] = classDetails[i].dataValues.class_std // [9, 9, 10, 10]
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
    res.status(200).json(successResponse)
})


app.listen(3000, ()=> console.log('Server started at 3000'))
