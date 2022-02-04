const bcrypt = require('bcryptjs');
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
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        bcrypt.hash(req.body.password, salt, async function (err, hash) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                let data = {
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    cellphone: req.body.cellphone,
                                    gender: req.body.gender,
                                    username: req.body.username,
                                    password: hash,
                                    role: req.body.role || "blogger"
                                };
                                await Blogger.create(data)
                                res.status(200).json({ result: true, message: "blogger was created successfully" });
                            }
                        });
                    }
                });
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
                bcrypt.compare(req.body.password, blogger.password, function (err, validate) {
                    if (validate) {
                        req.session.blogger = blogger;
                        res.status(200).json({ result: true })
                    }
                    else {
                        res.status(422).json({ result: false, message: "blogger not found" });
                    }
                });
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
    if (req.session.blogger && req.cookies.blogger_seed) {
        if (req.session.blogger.role === 'admin') {
            const bloggers = await Blogger.find();
            res.status(200).render('adminPanel', { title: 'admin panel', bloggers: bloggers });
        }
        else if (req.session.blogger.role === 'blogger') {
            try {
                const blogger = await Blogger.findById(req.session.blogger._id);
                res.status(200).render("profile", { title: "profile", blogger: blogger });
            } catch (error) {
                console.log(error);
            }
        }
    }
    else {
        res.status(422).redirect('/');
    }
}


const update_blogger = async (req, res) => {
    const bloggerId = req.session.blogger._id;
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
    const bloggerId = req.session.blogger._id;
    try {
        await Blogger.findByIdAndDelete(bloggerId);
        req.session.destroy();
        res.clearCookie("blogger_seed");
        res.status(200).json({ message: 'Blogger was deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}

const logout_blogger = (req, res) => {
    req.session.destroy();
    res.clearCookie("blogger_seed");
    res.status(200).json({ message: 'logout successfully' });
}

// const panel_admin = async (req, res) => {
//     if (
//         req.session.user &&
//         req.cookies.blogger_seed &&
//         req.session.user.role === "admin"
//     ) {
//         const bloggers = await Blogger.find({ role: "blogger" });
//         const admins = await Blogger.find({ role: "admin" });
//         res.render("adminPanel", { bloggers: bloggers, admins: admins });
//     } else {
//         res.redirect("/login");
//     }
// }


module.exports = { login_page, signup_page, check_blogger, read_blogger, create_blogger, update_blogger, delete_blogger, logout_blogger }