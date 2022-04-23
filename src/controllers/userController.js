const user = require("../models/user");
const auth = require("../../util/auth");

function signup(req, res) {
    let data = req.body;
    if(data.username && data.password){
        user.getUserSignupDetails(data,function (err, result) {
            if (err) {
              console.log(err);
              return res.status(500).send({
                msg: "Error during signup",
                success: false
              });
            }
            if(result.length>0){
                return res.status(409).send({
                    msg: "user already exists",
                    success: false
                  });
            }else{
                user.strongSignup(data,function (err, result) {
                    if (err) {
                      console.log(err);
                      return res.status(500).send({
                        msg: "Error during signup",
                        success: false
                      });
                    }
                    return res.status(200).send({
                        msg: "successfully signed up",
                        success: true
                      });
                });
            }
        });
    }else {
        return res.status(400).send({
            msg: "username or password is missing!",
            success: false
          });
    }
}

function login(req, res) {
    let data = req.body;
    console.log(data)
    if(data.username && data.password){
        user.strongLogin(data,function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                msg: "Error in login",
                success: false
            });
        }
        if (result.length == 0) {
            return res.status(400).send({
                msg: "username or password is incorrect",
                success: false
            });
        }
            return res.status(200).send({
            msg: "successfully logged in",
            success: true,
            User: result
            });
        });
    }
    else {
        return res.status(400).send({
            msg: "username or password is missing!",
            success: false
          });
    }
}

function isAuthenticated(req, res, next){
    console.log("isauth");
    const token = req.headers.auth;
    let response;
    try{
        response = auth.verifyToken(token);
       
    } catch(err){
        console.log(err);
        return res.status(401).send({
            message: "Invalid token",
            success: false
        });
    }
    user.getUserById(response.Username, function(err, result){
        console.log("inside grtuserid");
        if(err){
            return res.status(401).send({
                message: "Invalid user",
                success: false
            });
        }
        res.user = result;
        next();
    });
}

module.exports = {signup, login, isAuthenticated}
