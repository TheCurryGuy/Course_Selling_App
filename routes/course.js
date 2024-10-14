const express = require("express");
const { userMiddleware } = require("../middleware/userAuth");
const { purchaseModel, courseModel } = require("../db");
const Router = express.Router;

const courseRouter = Router();

courseRouter.post("/purchase",userMiddleware, async (req,res) => {
    const userId = req.userId
    const courseId = req.body.courseId

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message : "You have purchased the course succefully"
    })

})

courseRouter.get("/preview",async (req, res)=> {
    const courses = await courseModel.find({})

    res.json({
        courses
    })
})

module.exports = {
    courseRouter : courseRouter
}