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
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
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
        const user = await User.updateOne({ name: req.params.name }, {$set: {
            description: req.body.description,
            status: req.body.status,
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
        {name: searchTerm}, 
        {description: searchTerm}, 
        {status: searchTerm}
    ]}, (err, data) => {
        // console.log(data)
        res.render('home.ejs', { user: data })
    })
}

const form = (req, res) => {
    res.render('addtodo.ejs')
}

const edit = (req, res) => {
    const userTerm = req.params.name
    User.find({name: userTerm}, (err, data) => {
        console.log(data)
        res.render('edittodo.ejs', { user: data })
    })
}

const deleter = (req, res) => {
    User.deleteOne({ name: req.params.name}, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("Successful deletion");
        res.redirect('/')

    })
}

const viewer = (req, res) => {
    const userTerm = req.params.name
    User.find({name: userTerm}, (err, data) => {
        console.log(data)
        res.render('viewtodo.ejs', { user: data })
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