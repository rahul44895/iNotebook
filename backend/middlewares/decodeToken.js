const JWT = require("jsonwebtoken");
const JWT_SECRET_KEY = "daagijf4iygnv8ya2azcvzb";

const decodeToken = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send('Please enter a valid token');
    }
    try{
        const data = JWT.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    }
    catch(error){
        return res.status(401).send('Please enter a valid token');
    }
}
module.exports = decodeToken;
