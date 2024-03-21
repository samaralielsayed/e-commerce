const mongoose = require('mongoose')
const ServerUrl = 'mongodb+srv://admin:zgudU81aR4cENyAI@cluster0.m9og4vf.mongodb.net/iti'

const dbConnection = mongoose
    .connect(ServerUrl)
    .then(() => console.log('Connection stablished'))
    .catch((err) => console.log(err))


    module.exports = dbConnection