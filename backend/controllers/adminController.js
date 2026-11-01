const User = require("../models/userSchema")


let alluserController = async (req,res)=>{
    

    let users = await User.find({}).select("-password")

    res.status(200).json({
        success : true,
        message : `${users.length} user found`,
        data : users
    })
    
}

let singleUser = async (req,res)=>{
    let {id} = req.params

    let data = await User.findById({_id : id}).select('-password')
    res.status(200).json({
        success : true,
        message : `User info`,
        data : data
    })
}

let activeUser = async (req,res)=>{
    let data = await User.find({status : "active"})
    res.status(200).json({
        success : true,
        message : `Active user info`,
        data : data
    })
}

let deactiveUser = async (req,res)=>{
      

    let data = await User.find({status : 'deactive'})

     res.status(200).json({
        success : true,
        message : `deactive user info`,
        data : data
    })
}


let updateUser = async (req,res)=>{

    let {id} = req.params
    let data = await User.findByIdAndUpdate({_id : id},req.body,{new : true}).select('-password')

     res.status(200).json({
        success : true,
        message : `User Updated`,
        data : data
    })
}


let deleteuser = async(req,res)=>{
     let {id} =req.params

     let data = await User.findByIdAndDelete({_id : id})
     res.status(200).json({
         success : true,
        message : `User Deleted`,
        
     })
}


module.exports = { alluserController,singleUser,activeUser,deactiveUser,updateUser,deleteuser }