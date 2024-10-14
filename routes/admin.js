const { Router } = require("express")
const adminRouter = Router()
const{ adminModel, courseModel } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET_ADMIN } = require("../config")
const { adminMiddleware } = require("../middleware/adminAuth")


adminRouter.post("/signup", async (req, res)=> {
    const { email, password, firstName, lastName } = req.body;

    let errorthrown = false
    try{
        const hashedpass = await bcrypt.hash(password, 5)

        await adminModel.create({
            email : email,
            password: hashedpass,
            firstName: firstName,
            lastName: lastName
        })
    } catch(err){
        res.status(403).json({
            message: "admin already exists"
        })
        errorthrown = true
    }
    if(!errorthrown){
        res.json({
            message: "your account has been created"
        })
    }
})
adminRouter.post("/signin", async (req,res)=> {
    const email = req.body.email;
    const password = req.body.password;
    const admin = await adminModel.findOne({
        email: email
    })
    if(!admin){
        res.status(403).json({
            message: "admin doesn't exist"
        })
        return
    }
    const matchpass = await bcrypt.compare(password, admin.password)
    if(matchpass){
        const token = jwt.sign({
            id : admin._id.toString()
        }, JWT_SECRET_ADMIN)
        res.json({
            message : "you are signed in",
            token : token
        })
    }
    else{
        res.status(403).json({
            message: "invalid creds"
        })
    }
})

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId
    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId : adminId
    })
    res.json({
        message: "Course Created",
        courseId: course._id
    })

})
adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({//expects a filter and then data to be updated hence _id and creatorId was passed such that it filters out the required one
        _id: courseId, //this two FIELDS ARE FILTERS I REPEAT NOTHING IS GETTING CHANGED
        creatorId: adminId //had to pass the creator id as well else anyy creator will be able to manipulate the data inside it
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})
adminRouter.get("/course/bulk", adminMiddleware ,async (req, res)=> {
    const adminId = req.adminId;

    const data = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        message: "courses are - ",
        data
    })
})

module.exports = {
    adminRouter: adminRouter,
}