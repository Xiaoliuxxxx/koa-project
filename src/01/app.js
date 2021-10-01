/**
 * 使用koa创建http服务
 */
const Koa = require("koa");
const Router = require("@koa/router");
const Static = require("koa-static");
const path = require("path");
const Mount = require("koa-mount");
const fs = require("fs");
const util = require("util");
const compose = require("koa-compose");
const app = new Koa();
const router = new Router();
//托管静态资源
//最好使用动态路径

// 异步中间件
app.use(async (ctx, next) => {
  const data = await util.promisify(fs.readFile)("./public/index.html");
  ctx.type = "html";
  ctx.body = data;
  next();
});
//mount可以让他加上一个虚拟路径 只有访问/ssss才可以
// app.use(Mount("/ssss", Static(path.join(__dirname, "./public"))));
// router.get("/", (ctx) => {
//   ctx.body = "Home page";
// });
// router.post("/", (ctx) => {
//   ctx.body = "post/ page";
// });

// app.use(router.routes()).use(router.allowedMethods());
// koa没有路由系统，只有中间件功能
// ctx:context 上下文对象
// 相应 请求
// app.use((ctx) => {
//   // console.log(ctx.req.url);
//   // console.log(ctx.headers);
//   // console.log(ctx.method);
//   // console.log(ctx.ip);
//   // ctx.status = 202;
//   const path = ctx.path;
//   console.log(path);
//   if (path === "/") {
//     ctx.body = "Hello Koa";
//   } else if (path === "/foo") {
//     ctx.body = "foo page";
//   } else {
//     ctx.body = "404 Not found";
//   }
//   // ctx.res.end("Hello Koa res");
//   // ctx.body = "Hello Koa";
// });

app.listen(3000, () => {
  console.log("App listen http://localhost:3000");
});
