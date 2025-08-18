import jwt from "jsonwebtoken"


const userAuth = async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({
           success:false,
            message: 'Not Authorized login Again' 
        })
    }
    try {
      const tokenDecode =  jwt.verify(token,process.env.JWT_SECRET);
       if(tokenDecode.id){
            req.user = { id: tokenDecode.id }
       }else{
          return res.json({success: false , message: 'Not Authorized Login Again'})
       }

       next();
    }catch (error){
        res.json({ succcess: false, message: error.message});
    }
}

export default userAuth;