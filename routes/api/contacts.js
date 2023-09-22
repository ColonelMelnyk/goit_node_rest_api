const express = require('express');
const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId, authenticate} = require("../../middlewares");

const {schemas} = require("../../models/contacts");
const router = express.Router();

router.get("/",  authenticate, ctrl.listContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", authenticate, isValidId, validateBody(schemas.changeSchema), ctrl.updateContact);

router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.schemaUpdateFavorite), ctrl.updateFavoriteContact);
console.log("I am running!");
module.exports = router;