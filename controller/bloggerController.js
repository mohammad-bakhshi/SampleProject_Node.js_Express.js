const Blogger = require("../models/blogger");
//check_blogger,insert_blogger,update_blogger,delete_blogger,login_page,signup_page


const login_page = (req, res) => {
    res.status(200).render('login', { title: 'login page' });
}

const signup_page = (req, res) => {
    res.status(200).render('signup', { title: 'signup page' });
}

const check_blogger = async (req, res) => {
    try {
        const blogger = await Blogger.findOne({ username: req.body.username });
        res.status(200).json(blogger);
    } catch (error) {
        console.log(error);
    }
}

const receive_blogger = async (req, res) => {
    const bloggerId = req.params.id;
    try {
        const blogger = await Blogger.findById(bloggerId);
        res.status(200).render("profile",blogger);
    } catch (error) {
        console.log(error);
    }
}

const create_blogger = async (req, res) => {
    try {
        await Blogger.create(req.body)
        res.status(200).json({ message: "blogger was created successfully" });
    } catch (error) {
        console.log(error);
    }
}

const update_blogger = async (req, res) => {
    const bloggerId = req.params.id;
    const updates = req.body;
    try {
        await Blogger.findByIdAndUpdate(bloggerId, updates);
        res.status(200).json({ message: "Blogger was updated successfully." });
    } catch (error) {
        console.log(error);
    }
}

const delete_blogger = async (req, res) => {
    const bloggerId = req.params.id;
    try {
        await Blogger.findByIdAndDelete(bloggerId);
        res.status(200).json({ message: 'Blogger was deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}




module.exports = { login_page, signup_page, check_blogger, receive_blogger, create_blogger,delete_blogger }