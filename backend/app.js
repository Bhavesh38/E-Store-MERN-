const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");


const errorMiddleware = require("./middleware/error.js");
app.use(express.json());
app.use(cookieParser());

//routes import
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js")
app.use("/api/v1", product);
app.use("/api/v1", user)

//middleware for error
app.use(errorMiddleware);


module.exports = app;