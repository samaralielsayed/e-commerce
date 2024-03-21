const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../services/user.service');
const auth=async(req,res,next)=>{
    try{
        const token = req.headers["jwt"];
        if(!token){
        return res.status(401).send({message:"unauthorized user"});
    }
    const payload = jwt.verify(token,"jwtSecret")
    const {email} = payload;
    const user=await findUserByEmail(email);
    if(!user){
        return res.status(401).send({message:"unauthorized user"});
    }
        req.user = user;
        next();

    }catch(error){
        return res.status(401).send({message:error.message});
    }
}
module.exports = {auth};