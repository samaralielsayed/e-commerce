const express=require('express');
const app=express();

const { createUser, getUserByEmail, getAllUsers, login} = require('../controllers/users.controller');
const { auth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');
const router=express.Router();
router.post("/register",createUser);
// router.get("/:id",getUserByEmail)
// router.get("/",getAllUsers)
router.post('/login',login)
// router.get("/books",isAdmin,getUserBooks)




module.exports=router;