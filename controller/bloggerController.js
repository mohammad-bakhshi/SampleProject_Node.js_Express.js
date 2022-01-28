const Blogger = require("../models/blogger");
const bloggerValidation = require('../validation/bloggerValidation');
//check_blogger,insert_blogger,update_blogger,delete_blogger,login_page,signup_page

const signup_page = (req, res) => {
    res.status(200).render('signup', { title: 'signup page' });
}

const login_page = (req, res) => {
    res.status(200).render('login', { title: 'login page' });
}

const create_blogger = async (req, res) => {
    const result = bloggerValidation.createValidator(req.body);
    if (result.status === true) {
        try {
            const blogger = await Blogger.findOne({ username: req.body.username });
            if (!blogger) {
                await Blogger.create(req.body)
                res.status(200).json({ result: true, message: "blogger was created successfully" });
            } else {
                res.status(422).json({ result: false, message: "Username already exists." });
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(400).json({ result: false, message: result.message });
    }
}
const check_blogger = async (req, res) => {
    const result = bloggerValidation.loginValidator(req.body);
    if (result.status === true) {
        try {
            const blogger = await Blogger.findOne({ username: req.body.username });
            if (!blogger) {
                res.status(422).json({ result: false, message: "blogger not found" });
            }
            else {
                if (blogger.password === req.body.password) {
                    res.status(200).json({ result: true, bloggerId: blogger._id });
                }
                else {
                    res.status(422).json({ result: false, message: "password was incorrect" });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(400).json({ result: false, message: result.message });
    }
}

const read_blogger = async (req, res) => {
    const bloggerId = req.params.id;
    try {
        const blogger = await Blogger.findById(bloggerId);
        res.status(200).render("profile", blogger);
    } catch (error) {
        console.log(error);
    }
}


const update_blogger = async (req, res) => {
    const bloggerId = req.params.id;
    const updates = req.body;
    const result = bloggerValidation.updateValidator(updates);
    if (result.status === true) {
        try {
            await Blogger.findByIdAndUpdate(bloggerId, updates);
            res.status(200).json({ result: true, message: "Blogger was updated successfully." });
        } catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(400).json({ result: false, message: result.message });
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




module.exports = { login_page, signup_page, check_blogger, read_blogger, create_blogger, update_blogger, delete_blogger }