
const router= require('express').Router();

const { email, gmail } = require('../controller/appController');


 
router.post('/user/email',email);
router.post('/user/gmail',gmail);

module.exports=router;