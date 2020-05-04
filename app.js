require('dotenv').config()

const express=require('express')

const app=express()
const userRouter=require('./api/users/UserRouter')

app.use(express.json())
app.use('/api/users',userRouter)

app.listen(process.env.APP_PORT,()=>{
    console.log(process.env.APP_PORT)
})