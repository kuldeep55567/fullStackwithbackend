const express = require("express");
const {connection} = require("./config/db");
const { userRouter } = require("./routes/users.route");
const { postRouter } = require("./routes/post.route");
const { authenticate } = require("./middleware/auth");
const cors = require("cors")
require("dotenv").config();
const app = express();
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)
app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Connected to Database Successfully")
    } catch (error) {
        console.log("Couldn't Connect")
    }
    console.log(`Server is running at port ${process.env.port}`)
})
