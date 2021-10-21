import express from 'express'
import dbc from './database'
import studentModel from './student'
import classModel from './class'
let app = express()

app.use(express.json())

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
            class_std: req.body.classStd,
            class_div: req.body.classDiv
        }
    })

    // Above function returns the class_id
    let classId = classDetails[0].dataValues.class_id

    // Inserting record in the student table
    studentModel.create({
        student_fname: req.body.studentFname,
        student_mname: req.body.studentMname,
        student_lname: req.body.studentLname,
        c_id: classId
    })

    let successResponse = {
        transaction: "success"
    }
    
    // Sending response
    res.status(200).json(successResponse)
})


app.listen(3000, ()=> console.log('Server started at 3000'))
