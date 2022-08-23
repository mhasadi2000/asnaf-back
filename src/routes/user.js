
const router = require('express').Router();
const userController = require('../controllers/user');
const { verifyToken } = require('../services/jwt');

router.post('/me', (req, res) => {
    const token = req.headers.authorization.split(" ");

    if(token[0] !== 'Bearer') {
        res.status(401)
        return res.send({message: "token invalid"})
    }

    const isValid = verifyToken(token[1]);

    console.log(token, isValid);
    if(!isValid) {
        res.status(401)
        return res.send({message: "token invalid"})
    }
    
    userController.getMe(isValid.data.nationalcode, req, res);
});

module.exports = router;