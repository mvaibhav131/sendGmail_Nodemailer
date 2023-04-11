
const router= require('express').Router();

const { email, gmail } = require('../controller/appController');


 
router.post('/user/email',email); //for the email you need these path --> localhost:8080/api/user/email (post Request)
router.post('/user/gmail',gmail); //for the gmail you need these path --> localhost:8080/api/user/gmail (post Request) and
                                  // send the userEmail address in req.body

module.exports=router;