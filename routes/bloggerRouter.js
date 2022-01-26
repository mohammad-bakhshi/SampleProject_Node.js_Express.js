const express = require('express');
const router = express.Router();
const bloggerController = require('../controller/bloggerController');

// login page
router.get('/', bloggerController.login_page);

//signup page
router.get('/signup', bloggerController.signup_page);

//read blogger
router.get('/:id',bloggerController.receive_blogger);

//check blogger
router.post('/check', bloggerController.check_blogger);


//create blogger
router.post('/', bloggerController.create_blogger);

// //update blogger
// router.put('/:id',bloggerController.update_blogger);

//delete blogger
router.delete('/:id',bloggerController.delete_blogger);







module.exports = router;