const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcrypt");
const auth = require("../../util/auth")

function signup(data, callback){
    let sql = "insert into user(Username, password, CreatedAt, UpdatedAt) values(?, ?, now(), now())";
    let value = [];
    value.push(data.username);
    value.push(data.password);

    sqlConnection.executeQuery(sql,value,function(err,result){
        callback(err,result);
    }); 
}

function strongSignup(data, callback){
    let sql = "insert into user(Username, password, CreatedAt, UpdatedAt) values(?, ?, now(), now())";
    let values = [];
    values.push(data.username);
    bcrypt.hash(data.password, 8, function(err, hash){
        if(err){
            console.log(err);
            return; 
        }
        values.push(hash);
        sqlConnection.executeQuery(sql, values, function(err, result){
            callback(err, result);
        });
    });
}

function strongLogin(data, callback){
    let sql = "select Username, password from user where Username = ?";
    let value = [];
    value.push(data.username);
    sqlConnection.executeQuery(sql,value,function(err,result){
        const isValid = bcrypt.compareSync(data.password, result[0].password);
        if(isValid){
            const token = auth.newToken(result[0]);
            const response = [{
                UserId: result[0].UserId,
                Username: result[0].Username,
                authToken: token,
            }];
            callback(err,response);   
        }
        else{
            callback(err,[]);
        }
    }); 
}

function login(data, callback){
    let sql = "select Username, password from user where Username = ?";
    let value = [];
    value.push(data.username);
    sqlConnection.executeQuery(sql,value,function(err,result){
        if(result[0].password == data.password){
            callback(err,result);
        }
        else{
            callback(err,[]);
        }
    }); 
}

function getUserSignupDetails(data, cb){
    let sql = "select Username, password from user where Username = ? and password=?";
    let value = [];
    value.push(data.username);
    value.push(data.password);
    sqlConnection.executeQuery(sql,value,function(err,result){
        cb(err, result);
    });
}

function getUserById(Username,cb){
    console.log('inside getUserByid'); 
    let sql = "select Username from User where Username =?";
    let values = [Username];
    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    })
}


module.exports = {signup, login, strongLogin, strongSignup, getUserSignupDetails, getUserById};
