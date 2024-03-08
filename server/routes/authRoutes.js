const { Router } = require("express");
const authControllers = require("../controllers/authControler");
const router = Router();

router.post("/signup", authControllers.signup)

router.post("/login", authControllers.login)

router.get("/logout", authControllers.logout)

router.get('/verifyuser', authControllers.verifyuser)

module.exports = router;