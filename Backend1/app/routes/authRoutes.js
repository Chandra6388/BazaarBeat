const router = require("express").Router()
const { login , register , getAllUser , updateProfileImg, getUserById, forgotPassword, resetPassword } = require('../controllers/auth/authControllers')

router.post("/login", login);
router.post("/register", register);
router.post("/getAllUser", getAllUser);
router.post("/updateProfileImg", updateProfileImg);
router.post("/getUserById", getUserById);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);







module.exports = router;