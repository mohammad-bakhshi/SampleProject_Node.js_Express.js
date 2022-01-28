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
router.get('/:id',bloggerController.read_blogger);

//update blogger
router.put('/:id',bloggerController.update_blogger);

//delete blogger
router.delete('/:id',bloggerController.delete_blogger);







module.exports = router;