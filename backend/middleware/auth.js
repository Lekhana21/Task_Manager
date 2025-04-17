const jwt = require("jsonwebtoken");


const authenticateuser=(request,response,next)=>{
    
    const authHeader = request.header("Authorization");
    const token = authHeader&&authHeader.replace("Bearer ","");
    if(!token){
        return response.status(401).json({message:"No token found, please login first."});


    }
    try{
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        request.user=decoded;
        
        next();


    }catch(err){
        console.error("Token verification failed:",err.message);
        response.status(400).json({message:"Token is invalid or expired."});

    }
};

module.exports=authenticateuser;