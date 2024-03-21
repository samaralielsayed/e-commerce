//express methods
const express = require("express");
const exp = express();
const cors = require('cors');

//env
require("dotenv").config();

//Converting from json to Object
exp.use(express.json());

exp.use(cors());
//Database
require("./db/dbConnection");

const { auth } = require('./middleware/auth');
const { isAdmin } = require('./middleware/admin');
const { getUserBooks } = require('./controllers/users.controller');
const apiError =require("./validation/apiError");
const Error = require("./middleware/error");

//routes all methods from routing file
const productsRoutes = require("./routes/product.route");
const categoryRoutes = require("./routes/category.route");
const reviewRoutes= require("./routes/review.route");
const userProfileRoutes= require("./routes/userProfile.route");
const userRouter=require('./routes/users.route');

const shoppingCartRouter=require("./routes/shoppingCart.route");
const AdminRouter=require("./routes/admin.route");
const orderRoute= require("./routes/order.route")

exp.use("/api/products", productsRoutes);
exp.use("/api/categories", categoryRoutes);
exp.use("/api/profile",userProfileRoutes );
exp.use("/api/orders", orderRoute);

exp.use("/api/users",userRouter);
exp.use("/api/carts",shoppingCartRouter);
exp.use("/api/admin",AdminRouter);

// app.get("/api/users/books",[auth, isAdmin],getUserBooks)
exp.use("/api/products", reviewRoutes);


exp.use(Error);

//Server port connection
exp.listen(process.env.Port, () => {
  console.log(`server connection with port number: ${process.env.Port}`);
});
// process.on("unhandledRejection", (err) => {
//   console.log(` unhandledRejection error: ${err.name} | ${err.message}`);
//   server.close(() => {
//     process.exit(1);
//   });
// });