const sqlConnection = require("../services/sqlConnection");

function listProducts(data, callback){
    console.log("inside listproducts");
    let sql = "SELECT id as productID, name, price from products";
    let values = [];
    if(data.name){
        sql += " where name = ?";
        values.push(data.name);
        if(data.minPrice){
            sql += " AND price >= ?";
            values.push(data.minPrice);
        }else if(data.maxPrice){
            sql += " AND price <= ?";
            values.push(data.maxPrice);
        }
    }else if(data.minPrice){
        sql += " WHERE price >= ?";ss
        values.push(data.minPrice);
    }else if(data.maxPrice){
        sql += " AND price <= ?";
        values.push(data.maxPrice);
    } 
    sqlConnection.executeQuery(sql,values,function(err,result){
        callback(err,result);
    }); 
}

function addProducts(data, callback){
    let sql = "insert into products(name, category, price, createdAt) values(?, ?, ?, now())";
    let values = [];
    values.push(data.name);
    values.push(data.category);
    values.push(data.price);

    sqlConnection.executeQuery(sql,values,function(err,result){
        callback(err,result);
    }); 
}

module.exports = {listProducts, addProducts};