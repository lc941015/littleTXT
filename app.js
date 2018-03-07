var express = require("express");
var app = express();
var db = require("./model/db.js");
var MongoClient = require("mongodb").MongoClient;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
const url = "mongodb://localhost:27017";
const dbname = "test";
app.set("view engine","ejs");
// app.set("view options",{ "open":"{{", "close":"}}"});
// 静态页面
app.use(express.static("./public"));
app.get("/",function(req,res){
  db.findAll("txt").then(function(data){
    res.render("index",{
      list:data
    });
  }).catch(function(err){
    res.send("查找失败")
  })
})
app.get("/find",function(req,res){
  var params = {
    page:req.query.page || 0,
    size:req.query.size || 0,
    params:{}
  }
  db.findAll("txt",params).then(function(result){
    res.json({
      "code":0,
      "data":result
    })
  }).catch(function(err){
    res.json({
      "code":-1,
      "message":"查找失败"
    })
  })
})
app.post("/add",function(req,res){
  // console.log();
  var params = req.body
  db.insertOne("txt",params).then(function(result){
    res.json({
      "code":0,
      "message":"新增成功"
    })
  }).catch(function(err){
    res.json({
      "code":-1,
      "message":"插入失败"
    })
  })

})
app.post("/del",function(req,res){
  var params = req.body
  db.delectMany("txt",params).then(function(result){
    res.json({
      "code":0,
      "message":"删除成功"
    })
  }).catch(function(err){
    res.json({
      "code":-1,
      "message":"删除失败"
    })
  })
})
app.post("/update",function(req,res){
  var oldJson = {
    "user":req.body.user
  };
  var newJson ={
    "content":req.body.content
  }
  db.updateMany("txt",oldJson,newJson).then(function(result){
    res.json({
      "code":0,
      "message":"修改成功"
    })
  }).catch(function(err){
    res.json({
      "code":-1,
      "message":"修改失败"
    })
  })
})
app.listen(8008,"127.0.0.1",function(){
  console.log("服务器已启动，地址为127.0.0.1:8008")
})
