const User = require('../models/user/user')

const getTrade = (req, res) => {
    User.findById({_id: req.params.id})
    .then(result => {
        return res.send(result.trade)
    })
    .catch(err => {
        return res.send(err)
    })
}

const getDeposit = (req, res) => {
    User.findById({_id: req.params.id})
    .then(result => {
        return res.send(result.deposit)
    })
    .catch(err => {
        return res.send(err)
    })
}

const getDividend = (req, res) => {
    User.findById({_id: req.params.id})
    .then(result => {
        return res.send(result.dividend)
    })
    .catch(err => {
        return res.send(err)
    })
}

module.exports = { getTrade, getDeposit, getDividend }