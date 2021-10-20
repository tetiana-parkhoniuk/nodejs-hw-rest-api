const { NotFound, BadRequest } = require('http-errors');
const { User } = require('../../models');
const { sendEmail, verificationEmail } = require('../../helpers');

const additionalVerify = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const { verificationToken, isVerified } = user;
    if (!user) {
        throw new NotFound('User not found');
    }
    if (isVerified) {
        throw new BadRequest('Verification has already been passed');
    }
    
    const letter = await verificationEmail(email, verificationToken);
    await sendEmail(letter);
    res.json({
        status: 'success',
        code: 200,
        message: 'Additional verification email sent.'
    })
};

module.exports = additionalVerify;