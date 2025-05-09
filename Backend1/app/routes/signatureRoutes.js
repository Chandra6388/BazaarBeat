const router = require("express").Router()
const { AddSignature , updateSignature, getAllSignature , deleteSignature , getSignatureById, signatureSendByMails} = require('../controllers/users/signatureControllers')

router.post("/AddSignature", AddSignature);
router.post("/updateSignature", updateSignature);
router.post("/getAllSignature", getAllSignature);
router.post("/deleteSignature", deleteSignature);
router.post("/getSignatureById", getSignatureById);
router.post("/signatureSendByMails", signatureSendByMails);






module.exports = router;