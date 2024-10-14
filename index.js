const express = require("express")
require("dotenv").config()
const { userRouter } = require("./routes/user")
const {courseRouter} = require("./routes/course")
const { adminRouter } = require("./routes/admin")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())

app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/admin", adminRouter)

async function main(){
    //by doing this it ensures us that if the database connection fails then the server wont start onlyyy
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000, ()=> {
        console.log("Server is running on port 3000")
    })
}

main()