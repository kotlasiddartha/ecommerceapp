const jwt = require("jsonwebtoken");
const User = require("../../EcommerceApp/src/models/user");

function newToken(user){
    return jwt.sign({username: user.username}, 'relevel',{
        expiresIn: '10d'
    });
}

function verifyToken(token){
    console.log("inside verify token");
    try{
        let response = jwt.verify(token, 'relevel');
        return response;
    } catch(err){
        console.log(err);
        return;
    }
}

module.exports = {newToken, verifyToken}