const User = require('../models/user/user')

const addDeposit = (req, res) => {
    const newDeposit= req.body.data

    User.findByIdAndUpdate({_id: req.body.id},
    {$push: {
        "deposit": newDeposit
    }}
    )
    .then(result => {
        return res.send(result)
    })
    .catch(err => {
        return res.send(err)
    })
}

const addTrade = (req, res) => {
    const newTrade = req.body.data
    User.findByIdAndUpdate({_id: req.body.id},
    {$push: {
        "trade": newTrade
    }}
    )
    .then(result => {
        return res.send(result)
    })
    .catch(err => {
        return res.send(err)
    })
}

const addDividend = (req, res) => {
    const newDividend= req.body.data
    User.findByIdAndUpdate({_id: req.body.id},
    {$push: {
        "dividend": newDividend
    }}
    )
    .then(result => {
        return res.send(result)
    })
    .catch(err => {
        return res.send(err)
    })
}

const removeDeposit = (req, res) => {
    User.findByIdAndUpdate({_id: "60cb0d10d92c133b74de0a5f"}, 
        {$pull: {
            "deposit": {_id: "60e17f044e6df73f044a8a57"}
        }
    })
    .then(result => {
        return res.send(result)
    })
    .catch(err => {
        return res.send(err)
    })
}

const removeTrade = (req, res) => {
    User.findByIdAndUpdate({_id: "60cb0d10d92c133b74de0a5f"}, 
        {$pull: {
            "trade": {_id: "60e17f044e6df73f044a8a57"}
        }
    })
    .then(result => {
        return res.send(result)
    })
    .catch(err => {
        return res.send(err)
    })
}

const removeDividend = (req, res) => {
    User.findByIdAndUpdate({_id: "60cb0d10d92c133b74de0a5f"}, 
        {$pull: {
            "dividend": {_id: "60e17f044e6df73f044a8a57"}
        }
    })
    .then(result => {
        return res.send(result)
    })
    .catch(err => {
        return res.send(err)
    })
}

const updateDeposit = (req, res) => {
    User.findByIdAndUpdate({_id: "60cb0d10d92c133b74de0a5f",
    "deposit": {
        "$elemMatch": {
            "_id": "60e18009e3ee893420f77da9"
        }
    }},
    {
        "$set": {
            "deposit.$[demo].date": "Maharjan"
        }
    },
    {
        "arrayFilters": [
            {"demo._id": "60e18009e3ee893420f77da9"}
        ]
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
}

const updateTrade = (req, res) => {
    User.findByIdAndUpdate({_id: "60cb0d10d92c133b74de0a5f",
    "trade": {
        "$elemMatch": {
            "_id": "60e18009e3ee893420f77da9"
        }
    }},
    {
        "$set": {
            "deposit.$[demo].date": "Maharjan"
        }
    },
    {
        "arrayFilters": [
            {"demo._id": "60e18009e3ee893420f77da9"}
        ]
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
}

const updateDividend = (req, res) => {
    User.findByIdAndUpdate({_id: "60cb0d10d92c133b74de0a5f",
    "dividend": {
        "$elemMatch": {
            "_id": "60e18009e3ee893420f77da9"
        }
    }},
    {
        "$set": {
            "deposit.$[demo].date": "Maharjan"
        }
    },
    {
        "arrayFilters": [
            {"demo._id": "60e18009e3ee893420f77da9"}
        ]
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports = {
    addDeposit, addTrade, addDividend,
    removeDeposit, removeTrade, removeDividend,
    updateDeposit, updateTrade, updateDividend
}