const express = require('express');
const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId} = require("../../middlewares");

const {schemas} = require("../../models/contacts");
const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", isValidId, validateBody(schemas.changeSchema), ctrl.updateContact);

router.delete("/:id", isValidId, ctrl.removeContact);

router.patch("/:id/favorite", isValidId, validateBody(schemas.schemaUpdateFavorite), ctrl.updateFavoriteContact);
console.log("I am running!");
module.exports = router;