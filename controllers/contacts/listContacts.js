const { Contact } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const listContacts = async (req, res) => {
    const { _id } = req.user;
    const result = await Contact.find({ owner: _id }, '_id name email phone favorite');
    sendSuccessfulRes(res, { result });
};

module.exports = listContacts;