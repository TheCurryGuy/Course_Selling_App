const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId //mongoose.types.ObjectId will also work
//this file will run automatically evenif its not defined in index.js its coming through a via connection that is the routes as in the routes the db.js is defined to obtain the required model...thus it ensures this file to execute
// mongoose.connect("mongodb://bibek:OQdUYCYbd9wVavGm@bibek-shard-00-00.pk5bl.mongodb.net:27017,bibek-shard-00-01.pk5bl.mongodb.net:27017,bibek-shard-00-02.pk5bl.mongodb.net:27017/coursera-app?replicaSet=atlas-arlhkt-shard-0&ssl=true&authSource=admin")
//still this is not goood hence we willl directly define the connection in index.js

const userSchema = new Schema({
    email: {type: String, unique : true},
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email: {type: String, unique : true},
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId : ObjectId
})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model("user", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model("course", courseSchema)
const purchaseModel = mongoose.model("purchase", purchaseSchema)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}