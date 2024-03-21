const User = require("../models/user.model")

const createNewUser = async ({
    name,
    email,
    image,
    passwordHash,
    isAdmin
}) => {
    try {
        return await User.create({
            name,
            email,
            image,
            passwordHash,
            isAdmin
        });
    } catch (error) {
        return error+"nnn";
    }
}

const findUserByEmail = async (email) => {
    return await User.findOne({
        email
    });
}
const findAllUsers = async () => {
    return await User.find();
}


module.exports = {
    createNewUser,
    findUserByEmail,
    findAllUsers
}