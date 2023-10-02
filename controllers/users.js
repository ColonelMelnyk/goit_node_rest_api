const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require ("path");
const fs = require("fs");
const {User} = require("../models/user");
const {nanoid} = require("nanoid");
const { HttpsError, ctrlWrapper, emailSender } = require("../error_handler");

const {SECRET_KEY} = process.env;
const {BASE_URL} = process.env;
const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpsError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationCode});

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    };

    await emailSender(verifyEmail);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
    })
}
const emailVerification = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await User.findOne({verificationCode});
    if(!user){
        throw HttpsError(401, "Email not found")
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

    res.json({
        message: "Email verify success"
    })
}
const reVerify = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpsError(401, "Email not found");
    }
    if(user.verify) {
        throw HttpsError(401, "Email already verify");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`
    };

    await emailSender(verifyEmail);

    res.json({
        message: "Verify email send success"
    })
}

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpsError(401, "Email or password is wrong!");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpsError(401, "Email or password is wrong!");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
    })
}
const getCurrent = async(req, res)=> {
    const {email, name} = req.user;
    res.json({
        email,
        name,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}
const subscription = async(req, res)=>{
    const { _id}= req.user;
    const { subscription } = req.body;
    await User.findByIdAndUpdate(_id, {subscription})
    res.json({
        message: "Subscription updated"
    });
};
const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);
    try {
        fs.renameSync(tempUpload, resultUpload);
        const avatarURL = path.join('avatars', filename);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    subscription: ctrlWrapper(subscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    emailVerification: ctrlWrapper(emailVerification),
    reVerify: ctrlWrapper(reVerify),
}