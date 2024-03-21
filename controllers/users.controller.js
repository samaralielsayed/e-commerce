
const { createNewUser, findUserByEmail, findAllUsers } = require("../services/user.service");
const { validateNewUser } = require("../validation/users.validator");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");


const getAllUsers = async (req,res)=>{
    const users=  await findAllUsers();
    res.send(users);
}
// const getUserByEmail =async (req,res)=>{
//     const {name,email,password}=req.body
//     const user=  await findUserByEmail(email)
//        if(!user){
//         res.status(404).send("the user with given ID was not found");
//         return;
//        }
//         res.send(user);
// }


const createUser= async(req,res)=>{
    //const {name,email,password}=req.body
    try{
    const {error,value}=validateNewUser(req.body);
    if(error){
        res.status(400).send({message:"Invalid form field.."})
        return;
    }

    const passwordHash = await bcrypt.hash(value.password,10);
    const name = value.name;
    const email=value.email;
    const isAdmin = value.isAdmin;
    const image=value.image;

    const userFind= await findUserByEmail(email);
    if(userFind){
        return res.send({message:"This Email Already Exist, Please Enter Another Email"});
    }


    const newUser=await createNewUser({name,email,image,passwordHash,isAdmin});

    return res.send(newUser);}
    catch(error){res.status(500).send(userLoginError.message);}
}


const login= async(req, res)=>{    
  try{
    const{email,password}=req.body;
    if (!email || !password || Object.keys(req.body).length !== 2) {
            return res.status(400).send({ message: "Error: Enter only Email and Password" });
        }
        const user=await findUserByEmail(email);
        
    //const isValidPassword= await bcrypt.compare(password,user.passwordHash)
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).send({ message: "Incorrect Email or Password" });
    }
    const role= user.isAdmin ? "admin":"user";
    const token= jwt.sign({ email }, 'jwtSecret', { expiresIn: '1h' });
    res.header({jwt:token}).send({message:"Access Granted",email,token:token,role: role});
    // res.send(token)

  }catch(userLoginError){
    res.status(500).send(userLoginError.message);

  }
}


// const getUserBooks= async (req,res)=>{
//     const email =req.headers["email"]
//     if(!email ){
//         res.status(404).send({message:"the user with given email was not found"});
//         return;
//        }
    
//    const userBooks= await getUserBooksService(email);
// //    res.render('index',{title:'Books',Books:userBooks});
//    res.send(userBooks)
// // res.send(userCourses);

// }
module.exports={
    createUser,
    login,
    getAllUsers
}