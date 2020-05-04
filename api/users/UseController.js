const {
    create,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail
} = require('./UserService')
const {
    genSaltSync,
    hashSync,
    compareSync
} = require('bcrypt')
const{sign}=require('jsonwebtoken')
const createUser = (req, res) => {
    const body = req.body
    const salt = genSaltSync(10) //hashing npm
    body.password = hashSync(body.password, salt)
    create(body, (er, resutls) => {
        if (er) {
            console.log(er)
            return res.status(500).json({
                success: 0,
                message: "This isnot working"
            })
        }
        return res.status(200).json({
            success: 1,
            message: resutls
        })
    })
}
const getUserByUserIdCont = (req, res) => {
    const id = req.params.id
    getUserByUserId(id, (er, resutls) => {
        if (er) {
            console.log(er)
            return res.status(500).json({
                success: 0,
                message: "This isnot working"
            })
        }
        if (!resutls) {
            return res.status(200).json({
                success: 0,
                message: "no user found"
            })

        }
        return res.status(200).json({
            success: 1,
            message: resutls
        })
    })
}
const getUsersCont=(req,res)=>{
    getUsers((er,resutls)=>{
        if (er) {
            console.log(er)
            return res.status(500).json({
                success: 0,
                message: "This isnot working"
            })
        }
        if (!resutls) {
            return res.status(200).json({
                success: 0,
                message: "no user found"
            })

        }
        return res.status(200).json({
            success: 1,
            message: resutls
        })

    })
}
const updateUserCont=(req,res)=>{
    const body =req.body
    const salt = genSaltSync(10) //hashing npm
    body.password = hashSync(body.password, salt)
    updateUser(body,(er,resutls)=>{
        if (er) {
            console.log(er)
            return res.status(500).json({
                success: 0,
                message: "This isnot working"
            })
        }
        if (!resutls) {
            return res.json({
                success:0,
                message:"Record not found"
            })
            
        }
        
        return res.status(200).json({
            success: 1,
            message: "update succesfully"
        })
    })
}
const deleteUserCont=(req,res)=>{
    const data=req.body
    deleteUser(data,(er,resutls)=>{
        if (er) {
            console.log(er)
            return res.status(500).json({
                success: 0,
                message: "This isnot working"
            })
        }
        if (!resutls) {
            return res.json({
                success:0,
                message:"failed not found"
            })
            
        }
        return res.status(200).json({
            success: 1,
            message: "deleted succesfully"
        })
    })


}
const login=(req,res)=>{
    const body=req.body
    getUserByUserEmail(body.email,(err,resutls)=>{
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: 0,
                message: "This isnot working"
            })
        }
        if(!resutls){
            res.json({
                success:0,
                message:'invalid user or password'
            })
        }
        const re=compareSync(body.password,resutls.password)
        if(re){
            resutls.password=undefined
            const jsontoken=sign({re:resutls},process.env.jsonToken,{expiresIn:'1h'})
        
        return res.json({
            success:1,
            message:'login successfully',
            token:jsontoken
        })}else{
          return  res.json({
              success:0,
              message:'invalid email or password'
          })
        }

    })
}

module.exports = {
    createUser,
    getUserByUserIdCont,
    getUsersCont,
    updateUserCont,
    deleteUserCont,
    login
}