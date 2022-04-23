const sqlConnection = require("../services/sqlConnection");

function listCategories(callback){
    let sql = "SELECT ID as categoryID, Name as name from categories";
    let data = [];
    sqlConnection.executeQuery(sql,data,function(err,result){
        console.log('inside execute query');
        callback(err,result);
    }); 
}

module.exports = {listCategories};