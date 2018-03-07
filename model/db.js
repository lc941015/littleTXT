// 封装所有对数据库的常用操作
// 不管数据库的什么操作都要先链接数据库
// 链接数据库
var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";//本地数据库URL
const dbname = "test"
function _connectDB(cb){//链接数据库
  MongoClient.connect(url,function(err,db){
    cb(err,db)
  })
}
// 插入一条数据
exports.insertOne = function(collectionName,jsonData){
  // 无论成功还是失败操作完成后都要关闭数据库
  var p = new Promise(function(resolve, reject){
    _connectDB(function(err,db){
      if(err){
        reject(err);
        db.close();
      }
      db.db(dbname).collection(collectionName).insertOne(jsonData,function(err,result){
        if(err){
          reject(err);
          db.close();
        }
        resolve(result)
        db.close();
      })
    });
  })
  return p;
}
// 查找所有匹配数据 (遍历列表)  分页的话通过limit  一页显示多少条 跟skip 跳过多少条数据 （代表从第几页开始查找）
exports.findAll = function(collectionName,data){//若data什么都不传则代表查全部
  // 当json不传时默认为{}
  var data = data || {
    page:0,
    size:0,
    params:{}
  };
  var result = [];
  var cursor; //定义查找游标
  var p = new Promise(function(resolve, reject){
    _connectDB(function(err,db){
      if(err){
        reject(err);
        db.close();
      }
      // 获取数据页数
      /* 老版本写法 利用游标遍历 新版本可以直接生成一个数组
      cursor = db.db(dbname).collection(collectionName).find(data.params).limit(data.size).skip((data.page-1)*data.size);
      // skip 表示从第几条开始数
      cursor.each(function(err,doc){
        if(err){
          reject(err);
        }
        if(doc != null){
            result.push(doc)
        }else{
          resolve(result)
        }
        })
        */
        // skip 0 limit 0 代表查所有
      result = db.db(dbname).collection(collectionName).find(data.params).limit(data.size).skip((data.page-1)*data.size).toArray();
      resolve(result);
      db.close();
    });
  })
  return p;
}
// 删除所有数据
exports.delectMany = function(collectionName,jsonData){
  var p = new Promise(function(resolve, reject){
    _connectDB(function(err,db){
      if(err){
        reject(err);
        db.close();
      }
      db.db(dbname).collection(collectionName).deleteMany(jsonData,function(err,result){
        if(err){
          reject(err);
          db.close();
        }
        resolve(result)
        db.close();
      })
    });
  })
  return p;
}
// 修改数据
exports.updateMany = function(collectionName,oldJson,newJson){//oldJson条件 newJson 修改成什么
  var p = new Promise(function(resolve, reject){
    _connectDB(function(err,db){
      if(err){
        reject(err);
        db.close();
      }
      var params = {$set:newJson};
      db.db(dbname).collection(collectionName).updateMany(oldJson,params,function(err,result){
        if(err){
          reject(err);
          db.close();
        }
        resolve(result)
        db.close();
      })
    });
  })
  return p;
}
