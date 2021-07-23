const mongoose = require('mongoose')
const Schema = mongoose.Schema

const depositSchema = new Schema({
    amount: String,
    date: String,
    broker: String,
    fees: String
})

const tradeSchema = new Schema({
    date: String,
    ticker: String,
    stockName: String,
    action: String,
    amount: String,
    cost: String,
    units: String,
    average: String,
    fees: String
})

const dividendSchema = new Schema({
    date: String,
    ticker: String,
    stockName: String,
    total: String,
    tax: String,
    taxPercent: String,
    net: String
})

const userSchema = new Schema({
    email: String,
    username: String,
    password: String, 
    emailVerification: {
        type: Boolean,
        default: true
    },
    deposit: [depositSchema],
    trade: [tradeSchema],
    dividend: [dividendSchema]
})

const User = mongoose.model('User', userSchema)
module.exports = User;



/*
add trade, deposit, dividend details ($push)
delete them ($pull)
edit them ($set)
*/
