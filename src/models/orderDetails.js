const sqlConnection = require("../services/sqlConnection");

function listOrderDetails(data, cb){
    let sql = `select * from orderdetails O inner join
                orderitems OI on O.ID=OI.OrderID inner join products P
                on OI.ProductID = P.id where O.UserID=?`;
    let values = [data.userId];

    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    }); 
}

function findOrderByUser(data, cb){
    let sql = `select ID, Total as total 
               from orderdetails where 
               UserID = ? and OrderStatus = 1`;
    let values = [data.userId];

    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    });
}

function addOrder(data,cb){
    let sql = `select ID, Total as total 
               from orderdetails where 
               UserID = ? and OrderStatus = 1`;
    let values = [];
    values.push(data.total);
    values.push(data.userId);

    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    });
}

function editOrder(data,cb){
    let sql = `update orderdetails set Total = ?, OrderStatus = ?,
                UpdatedAt = now() where ID = ?`;
    let values = [];
    if(data.payment){
        sql = `update orderdetails set OrderStatus = ?,
                UpdatedAt = now() where ID = ?`;
        values.push(2);
    }else{
        values.push(data.total);
        values.push(1);
    }
    values.push(data.userId);
    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    });
}

function findOrderByUser(data, cb){
    let sql = `select ID, Total as total 
               from orderdetails where 
               UserID = ? and OrderStatus = 1`;
    let values = [data.userId];

    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    });
}

function getOrderDetails(data,cb){
    let sql = `select od.ID as OrderId, od.Total as total,
                p.id as productId, p.name as productName, p.price as price,
                oi.Quantity as Quantity
               from orderdetails as od left join orderitems as oi on 
               od.ID = oi.OrderID left join products as p ON 
               p.ID = oi.ProductID where od.UserID = ? and od.OrderStatus = 1`;
    let values = [];
    values.push(data.userId);

    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    });
}

module.exports = {
    listOrderDetails,
    findOrderByUser,
    addOrder,
    editOrder,
    getOrderDetails
}