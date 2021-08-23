const User = require('../models/userModel')

const home = (req, res) => {
    User.find({}, (err, data) => {
        // console.log(data)
        res.render('home.ejs', { user: data })
    })
    // res.render('home')
}

const create = (req, res) => {
    const user = new User({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        comment: req.body.comment
    })
    user.save()
    .then((data) => { 
        // res.status(201).send(data)
        res.redirect('/')
    }) 
    .catch((e) => {
        console.log(e)
        res.status(400).send('An Error occurred while creating the user')
    })
}

const update = async (req, res) => {
    try {
        const user = await User.updateOne({ firstName: req.params.name}, {$set: {
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            comment: req.body.comment
        }},{new: true})
        console.log(user)
        // res.send(user)
        res.redirect('/')
    }
    catch(e) {
        console.log(e)
        res.send(e)
    }
}

const find = (req, res) => {
    const searchTerm = req.body.search
    console.log(searchTerm)
    User.find({$or:[
        {firstName: searchTerm}, 
        {lastName: searchTerm}, 
        {email: searchTerm}
    ]}, (err, data) => {
        // console.log(data)
        res.render('home.ejs', { user: data })
    })
}

const form = (req, res) => {
    res.render('adduser.ejs')
}

const edit = (req, res) => {
    const userTerm = req.params.name
    User.find({firstName: userTerm}, (err, data) => {
        console.log(data)
        res.render('edituser.ejs', { user: data })
    })
}

const deleter = (req, res) => {
    User.deleteOne({ firstName: req.params.name}, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("Successful deletion");
        res.redirect('/')

    })
}

const viewer = (req, res) => {
    const userTerm = req.params.name
    User.find({firstName: userTerm}, (err, data) => {
        console.log(data)
        res.render('viewuser.ejs', { user: data })
    })
}

module.exports = {
    create,
    update,
    home,
    find,
    form,
    edit,
    deleter,
    viewer
}