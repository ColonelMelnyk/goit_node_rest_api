const {Schema, model} = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../error_handler");

const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema({
    name:{
      type: String,
      required: [true, 'Set name for user']
      },
    password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        match: emailFormat,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: ""
    },
      avatarURL:{
        type: String,
        required: true 
    },
    verify: {
      type: Boolean,
      default: false,
  },
  verificationCode: {
      type: String,
      default: ""
  }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailFormat).required(),
    password: Joi.string().min(6).required(),
})
const emailVerifySchema = Joi.object({
  email: Joi.string().pattern(emailFormat).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailFormat).required(),
    password: Joi.string().min(6).required(),
})
const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
}).unknown(false);

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    emailVerifySchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
    
}