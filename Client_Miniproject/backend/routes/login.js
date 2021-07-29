require('tls').DEFAULT_MIN_VERSION = 'TLSv1'   // since TLSv1.3 default disable v1.0 
const express = require('express');
const soap = require('soap');
const { userUsecase } = require('../usecase/userUsecase')
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';
const router = express.Router()
const { db, admin } = require('../configs/firebase')
const { createToken } = require('../configs/jwt')

// //remove token
// router.delete('/logout/:userId', async (req, res) => {
//     const userId = req.params.userId
//     const docRef = db.collection('token')
//     const find = await docRef.where('id', "==", userId).get()
//     let deleteId = {}

//     try {
//         if (!find.empty) {
//             find.forEach(res => deleteId = { ...res.data() })
//         }
//         docRef.doc(deleteId.id).delete()
//         res.status(200)
//             .clearCookie('token')
//             .clearCookie('user')
//             .send({ code: 200, status: "Logout", message: "Logout" });
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500)
//     }
// })

//create token
router.post('/login', (req, res) => {
    try {
        soap.createClient(url, (err, client) => {
            const { username, password } = req.body    
                client.GetUserDetails({ username, password}, (err, response) => {
                    try {
                        const responseData = {
                            userId: userUsecase.getStudentId(response),
                            role: userUsecase.getRole(response),
                            name: userUsecase.getName(response),
                            surname: userUsecase.getSurname(response),
                            faculty: userUsecase.getFaculty(response),
                            department: userUsecase.getDepartment(response),
                            email: userUsecase.getEmail(response)
                        }
                    
                        createToken( responseData, req, res)

                    } catch (error) {
                        console.log(error)
                    }
                })
           
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})

module.exports = router;