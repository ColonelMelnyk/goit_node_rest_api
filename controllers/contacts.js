const {Contact} = require("../models/contacts");
const { HttpsError, ctrlWrapper } = require("../error_handler");

const listContacts = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
    res.json(result);
}

const getContactById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOne({ $and: [{ _id: id }, { owner }] });
    if (!result) {
        throw HttpsError(404, "Not found");
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
}

const updateContact = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({ $and: [{ _id: id }, { owner }] }, req.body, { new: true });
    if (!result) {
        throw HttpsError(404, "Not found");
    }
    res.json(result);
}

const removeContact = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndDelete({ $and: [{ _id: id }, { owner }] });
    if (!result) {
        throw HttpsError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
}
const updateFavoriteContact = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({ $and: [{ _id: id }, { owner }] }, req.body, {new: true});
    if (!result) {
        throw HttpsError(404, "Not found");
    }
    res.json(result);
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
    updateFavoriteContact: ctrlWrapper(updateFavoriteContact)
}