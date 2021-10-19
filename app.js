import express from 'express'
let app = express()

app.use(express.json())

app.post('/createTest', (req, res) => {
    let testDetails = req.body
    console.log(`${JSON.stringify(req.body)}`)
})

app.post('/login', (req, res) => {
  res.send('Hello from login')  
})

app.listen(3000, ()=> console.log('Server started at 3000'))
