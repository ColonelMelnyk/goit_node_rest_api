const express = require("express");

const ctrl = require("../../controllers/users");

const {validateBody, authenticate, upload, avatarSize} = require("../../middlewares");

const {schemas} = require("../../models/user");


const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.subscriptionSchema),  ctrl.subscription);

router.patch("/avatars", authenticate, upload.single("avatar"), avatarSize, ctrl.updateAvatar);

router.get("/verify/:verificationCode", ctrl.emailVerification);

router.post("/verify", validateBody(schemas.emailVerifySchema), ctrl.reVerify);

module.exports = router;