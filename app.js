import express from 'express'
let app = express()

app.use(express.json())

app.post('/admin/addTeacher', (req, res) => {
    let teacherInfo = req.body
    console.log(`My teacher name is ${teacherInfo.name}`)
})



app.post('/createTest', (req, res) => {
    let testDetails = req.body
    console.log(`${JSON.stringify(req.body)}`)
})




app.listen(3000, ()=> console.log('Server started at 3000'))
