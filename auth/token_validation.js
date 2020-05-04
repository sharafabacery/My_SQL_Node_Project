const {verify}=require('jsonwebtoken')

const checktoken=(req,res,next)=>{
let token=req.get('authorization')
if(token){
token=token.slice(7)
verify(token,process.env.jsonToken,(err,deco)=>{
    if(err){
        res.json({
            success:0,
            message:'Invalid token'
        })
        
    }else{
        next()
    }

})
}else{
    res.json({
        success:0,
        message:'Access denadied'
    })
}
    
}
module.exports={
checktoken
}