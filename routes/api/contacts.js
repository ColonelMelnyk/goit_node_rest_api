const express = require('express');
const ctrl = require("../../controllers/contacts");

const {validateBody} = require("../../middlewares");

const schemas = require("../../schema/contacts");
const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id",  validateBody(schemas.changeSchema), ctrl.updateContact);

router.delete("/:id", ctrl.removeContact);
console.log("I am running!");
module.exports = router;