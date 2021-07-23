const User = require('../models/user/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegistration = (req, res) => {
    const newUser = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,        
    }
    User.findOne({
        email: newUser.email
    })
    .then(user => {
        if(!user){
            bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
                newUser.password = hashedPassword

                    User.create(newUser)
                        .then(result => {
                            return res.send(result)
                        })
                        .catch(err => {
                            return res.send(err)
                        })
            })
        } else {
            return res.status(400).send({error: "Used Email Address"})
        }
    })
    
}

const addBroker = (req,res) => {
    const newUser = {
        date: req.body.date
    }
    /*User.updateOne({"_id": ObjectId("60cb0d10d92c133b74de0a5f"),
    "trade": {
        "$elemMatch": {
            "_id": ObjectId("60dbf7142ee6692b1cf332a9")
        }
    }},
    {
        "$set": {
            "trade.$[demo].date": "Maharjan"
        }
    },
    {
        "arrayFilters": [
            {"demo._id": ObjectId("60dbf7142ee6692b1cf332a9")}
        ]
    })*/
    User.findByIdAndUpdate({_id: "60cb0d10d92c133b74de0a5f"},
    {$push: {
        "trade": newUser
    }}
    )
    /*User.findByIdAndUpdate({_id: "60cb0d10d92c133b74de0a5f"},
    {$pull: {
        "trade": {"_id": "60dbf7142ee6692b1cf332a9"}
    }}
    )*/
    .then(result => {
        return res.send(result)
    })
    .catch(err => {
        return res.send(err)
    })
}

const login = (req, res) => {
    const email= req.body.email
    const password = req.body.password

    User.findOne({email: email})
    .then(user => {
        if(user == null){
            return res.status(400).send({error: "Invalid Credentials"})
        } else {
            if(user.emailVerification){
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result){
                        const verifiedUser = {name: email}

                        const accessToken = jwt.sign(verifiedUser, process.env.ACCESS_TOKEN, {expiresIn: '1h'})

                        res.cookie('token', accessToken, {httpOnly: true})
                        res.json({accessToken: accessToken, id: user._id})
                    } else {
                        return res.status(400).send({error: "Invalid Credentials"})
                    }
                })
            } else {
                return res.status(401).send({error: "Requires Verification"})
            }
        }
    })
    .catch(err => console.log(err))
}

module.exports = {
    userRegistration, addBroker, login
}