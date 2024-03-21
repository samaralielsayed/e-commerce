const joi = require('joi');
const validateNewUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50).required(),
        email: joi.string().email({
            tlds: {
                allow: false
            }
        }).required(),
        image: joi.string().min(6).max(255).required(),
        password: joi.string().min(6).max(255).required(),
        isAdmin: joi.boolean()

    })
    return schema.validate(user);
};
const validateUser = (user) => {
    const schema = joi.object({
        name: joi.string().min(3).max(50),
        email: joi.string().email({
            tlds: {
                allow: false
            }
        }),
        image: joi.string().min(6).max(255),
        password: joi.string().min(6).max(255),
        isAdmin: joi.boolean()

    })
    return schema.validate(user);
};
module.exports = {
    validateNewUser,
    validateUser
}