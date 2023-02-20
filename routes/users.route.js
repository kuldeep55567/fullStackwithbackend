const express = require("express");
const { userModel } = require("../model/usermodel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
userRouter.get("/", (req, res) => {
    res.send("Hello Hii")
})
userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city } = req.body
    try {
      bcrypt.hash(password, 8, async (err, hashed) => {
            if (err) {
                res.send({ "mssg": "Something went wrong", "error": err.message })
            } else {
                const user = new userModel({ name, email, gender, password: hashed, age, city });
                await user.save()
                res.send({ "mssg": "User Registered Successfully" })
            }
        });
    } catch (error) {
        res.send({ "mssg": "Error while Registering", "error": err.message })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID:user[0]._id }, "masai");
                    res.send({ "mssg": "Log In Successfull", "token": token })
                } else {
                    res.send({ "mssg": "wrong-Credentials" })
                }
            });
        } else {
            res.send({ "mssg": "Something went wrong" })
        }
    } catch (error) {
        res.send({ "mssg": "Something went wrong", "error": err.message })
    }
})
module.exports = { userRouter }