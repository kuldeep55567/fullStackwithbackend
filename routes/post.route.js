const express = require("express");
const {postModel}= require("../model/postmodel")
const postRouter = express.Router();
postRouter.get("/posts", async(req,res)=>{
    const {device} = req.query;
    if(device){
        let post =  await postModel.find({device:device})
        res.send(post)
    }else{
        res.send( await postModel.find())
    }

})
postRouter.post("/create", async(req,res)=>{
    try {
        const new_post = new postModel(req.body)
        new_post.save()
        res.send({"mssg":"Successfully note created"})
    } catch (error) {
        console.log({"mssg":"Something Error"})
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    const Posts = await postModel.findOne({"_id":id})
    const userID_post = Posts.userID
    const userID_req = req.body.userID
    try {
        if(userID_post!=userID_req){
            res.send({"mssg":"Sorry you are not Authorised"})
        }else{
            await postModel.findByIdAndUpdate({"_id":id},req.body)
            res.send("Post Updated")
        }
    } catch (error) {
        res.send({"mssg":"Cannot update post"})
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    let id = req.params.id
    const posts = await postModel.findOne({"_id":id})
    const userID_post = posts.userID
    const userID_req = req.body.userID
    try {
        if(userID_post!=userID_req){
            res.send({"mssg":"Sorry you are not Authorised"})
        }else{
            await postModel.findByIdAndDelete({"_id":id})
            res.send("Post Deleted")
        }
    } catch (error) {
        res.send({"mssg":"Cannot delete post"})
    }
})
module.exports={postRouter}