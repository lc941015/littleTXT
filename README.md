# node与MongoDB的小DEMO
##使用技术
*   express node的框架，用于搭建服务器，配置路由，静态服务，编译ejs模板等
*   MongoDB 非关系型数据库，有完善的nodejsAPI ，json操作数据，简单易懂
*   ejs node模板引擎，用于编译首屏数据
*   jquery bootstrap 分别用于前端页面操作跟UI布局
##目录结构
-   model文件夹 存放封装好的DAO 数据库操作方法 
-   view文件夹 存放ejs模板页面  （为了方便 bootstrap 跟jQuery cdn引入）
-   app.js 服务的根文件 由于逻辑简单就没有单独抽出路由文件，路由配置也在此文件中
##运行方法
首先npm install 下载所需依赖
再npm start 启动服务器