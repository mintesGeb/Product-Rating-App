var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//let productRouter2 = require("./routes/products");
let authRouter = require("./routes/auth");
let reviewRouter = require("./routes/reviews");
const productRouter = require("./routes/product");
const logRouter = require("./routes/log");
let mongoConnect = require("./utils/database").mongoConnect;

const db = require("./config/database");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "Product API",
//       description: "Check product and It's reviews",
//       contact: {
//         name: "mintesinot and amanuel",
//       },
//       servers: ["http://localhost:3000"],
//     },
//   },
//   apis: ["app.js", "./routes/product.js"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/", authRouter);

app.use("/", logRouter);

app.use("/users", usersRouter);

app.use("/products", productRouter);
app.use("/reviews", reviewRouter);

//db()
//app.use('/products',productRouter2)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = app;
mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server Started on port 3000");
  });
});
