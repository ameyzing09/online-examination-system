// import teachSubClassServices from "./services/teachSubClassServices"
// import teachSubClassModel from "./model/teachSubClass"
// import teacherModel from "./model/teacher"
// import subjectModel from './model/subject'
// import classModel from "./model/class"
// import teachClass from "./model/teachClass"

// // async function getId() {
// //     const tsdId = await teachSubClassServices.getTeachSubClassId({
// //         tsd_teacher_id: 1,
// //         tsd_subject_id: 1,
// //         tsd_class_id: 1
// //     })
// //     console.debug("tsdId : ", tsdId)
// //     return tsdId
// // }

// async function getSubjectById() {

//     const subjects = await teachClass.findAll({
//         where : { 
//             teacher_id: 3
//         },
//         include: [ classModel]
//     })
//     return subjects[0].class.dataValues
// }
// console.log(getSubjectById().then(subject=> console.log(subject)))


async function test(){
    let flag = true;
    return new Promise((resolve, reject ) => { 
        setTimeout (()=> resolve(flag), 3000);
    });
}

test()
.then(data => console.log(data))
.catch(err => console.error(err));