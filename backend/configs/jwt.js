const jwt = require('jsonwebtoken');
const fs = require('fs')
const { db } = require('./firebase');
require('dotenv').config()
const privateKey="test"
const createToken = async ( responseData, req, res) => {
      try {
            if (responseData.userId === null && responseData.role === null) {
                  res.status(401).send("ID หรือ Password ผิด");
            } else {
                  const payload = {
                        id: responseData.userId,
                        type: responseData.role,
                        exp: Math.floor(Date.now() / 1000) + (60 * 10)
                  }

                  let encoded = jwt.sign(payload, privateKey,{ algorithm: 'HS256' });
                  console.log("555")
                  res.status(200)
                        .cookie("token", encoded, {
                              expire: Math.floor(Date.now() / 1000) + (60 * 10),
                              httpOnly: true,
                        })
                        .cookie("user", {
                              id: responseData.userId,
                              name: responseData.name,
                              surname: responseData.surname,
                              type: responseData.role,
                        }, {
                              expire: Math.floor(Date.now() / 1000) + (60 * 10),
                        })
                        .send({
                              token: encoded,
                              user: {
                                    id: responseData.userId,
                                    name: responseData.name,
                                    surname: responseData.surname,
                                    type: responseData.role,
                              }
                        })

            }
      } catch (error) {
            console.error(error)
            res.status(400).send({ code: 400, success: false, message: "เกิดข้อผิดพลาด" + error })
      }
}

const verifyHeader = async (req, res, next) => {
      try {
            if (req.cookies) {
                  const token = req.cookies && req.cookies.token
                  if (token) {
                        const verifyToken = await tokenRef.doc('token', '==', token).get()
                        if (verifyToken.empty) {
                              res.status(401).send({ code: 401, logout: true, message: "session หมดอายุ" });
                        }
                        else next()
                  }
                  else res.status(401).send({ code: 401, logout: true, message: "กรุณา Login" });
            }
      } catch (error) {
            console.log(error)
            res.sendStatus(400).send({ code: 401, logout: true, message: error });
      }
}

module.exports = {
      verifyHeader,
      createToken
}