import express from 'express'
let app = express()

app.use(express.json())

app.post('/createTest', (req, res) => {
    let testDetails = req.body
    
    res.send(`Your teacher has scheduled ${testDetails.subject} on ${testDetails.date}`)
})

app.listen(3000, ()=> console.log('Server started at 3000'))
