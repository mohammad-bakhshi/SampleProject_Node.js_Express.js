const express = require('express');
const router = express.Router();
const bloggerController = require('../controller/bloggerController');

//signup page
router.get('/signup', bloggerController.signup_page);

// login page
router.get('/', bloggerController.login_page);

//create blogger
router.post('/', bloggerController.create_blogger);

//check blogger
router.post('/check', bloggerController.check_blogger);

//read blogger
router.get('/profile', bloggerController.read_blogger);

//update blogger
router.put('/profile', bloggerController.update_blogger);

//delete blogger
router.delete('/profile', bloggerController.delete_blogger);

//logout blogger
router.get('/logout', bloggerController.logout_blogger);

module.exports = router;