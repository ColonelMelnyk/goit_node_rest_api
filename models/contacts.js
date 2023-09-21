const {Schema, model} = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../error_handler");

const contactSchema = new Schema( {
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  }, 
    owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const changeSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or('name', 'email', 'phone', 'favorite');

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    changeSchema,
    schemaUpdateFavorite,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
}