const router = require("express").Router()
const { login , register  } = require('../controllers/auth/authController')

router.post("/login", login);
router.post("/register", register);


module.exports = router;