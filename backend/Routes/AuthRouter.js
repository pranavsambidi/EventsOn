const {loginValidation} = require('../Middlewares/AuthValidation');
const {login} = require('../Controllers/AuthController');

const router =require('express').Router();

router.post('/login', loginValidation, login);
module.exports = router;
