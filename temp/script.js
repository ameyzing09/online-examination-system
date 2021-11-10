let fname = document.getElementById('fname')
let mname = document.getElementById('mname')
let lname = document.getElementById('lname')
let classStdSelect = document.getElementById('classStd')
let classDivSelect = document.getElementById('classDiv')

let registerBtn = document.getElementById('submitBtn')
let classStd, classDiv

document.addEventListener('DOMContentLoaded', async()=> {
    const response = await axios.get('http://localhost:3000/getClass')
    classStd = response.data.classStd
    classDiv = response.data.classDiv
    getClassOption(classStd, classDiv)
})

function getClassOption(standard, division) {
    standard.forEach(std => {
        let option = document.createElement('option')
        option.value = option.text = std
        classStdSelect.add(option)
    })

    division.forEach(div => {
        let option = document.createElement('option')
        option.value = option.text = div
        classDivSelect.add(option)
    })
}

registerBtn.addEventListener('click', async() => {
    let requestBody = {
        studentFname: fname.value,
        studentMname: mname.value,
        studentLname: lname.value,
        classStd: classStdSelect.value,
        classDiv: classDivSelect.value
    }

    const response = await axios.post('http://localhost:3000/studentRegistration', {
        requestBody
    })
    fname.value = mname.value = lname.value = ""
    classStdSelect.value = "Standard"
    classDivSelect.value = "Division"
    console.log(response)
})