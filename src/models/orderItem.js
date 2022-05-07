const sqlConnection = require("../services/sqlConnection");

function addOrderItem(data, cb){
    let sql = `Insert into orderitems(OrderID, ProductID, 
                Quantity, CreatedAt, UpdatedAt)
                values (? ,? ,? ,now(), now())`;
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    values.push(data.quantity);

    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    }); 
}

function editOrderItem(data,cb){
    let sql = `update orderitems set Quantity = ?, UpdatedAt= now()
                where OrderID = ? and ProductID = ?`;

    let values = [];
    values.push(data.quantity);
    values.push(data.orderId);
    values.push(data.productId);
    
    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    }); 
}

function deleteOrderItems(data, cb){
    let sql = `delete from orderitems where
                OrderId = ? aand ProductId = ?`;
    
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    
    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    }); 
}


function getOrderItems(data, cb){
    let sql = `select * from orderitems where
                OrderId = ? aand ProductId = ?`;
    
    let values = [];
    values.push(data.orderId);
    values.push(data.productId);
    
    sqlConnection.executeQuery(sql,values,function(err,result){
        cb(err,result);
    }); 
}


module.exports = {addOrderItem, editOrderItem, deleteOrderItems, getOrderItems};