const express = require('express');
const User = require('../models/user');
const router = express.Router()


// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users) // if successful send data to user
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one
router.get('/:id', getUsers, (req, res) => {
    res.json(req.users)
});

// Creating one user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        isCoding: req.body.isCoding
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser) // 201 more detailed creation stats
    } catch (err) {
        res.status(400).json({ message: err.message }) // bad data input
    }
});

// Updating one
router.patch('/:id', getUsers, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.isCoding != null) {
        res.user.name = req.body.isCoding
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Deleting one
router.delete('/:id', getUsers, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: "Deleted User"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUsers (req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
} // middleware, cuz we don want to repeat the code everytime

module.exports = router