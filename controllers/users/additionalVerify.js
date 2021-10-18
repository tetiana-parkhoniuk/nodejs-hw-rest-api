const { NotFound, BadRequest } = require('http-errors');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const additionalVerify = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.isVerified) {
        throw new BadRequest('Verification has already been passed');
    }
    if (user) {
        const { verificationToken, isVerified } = user;
        if (!isVerified) {
            const additionalEmail = {
                to: email,
                subject: 'Additional Email Verification',
                html: `
                <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">
                Click here to confirm your email address
                </a>
                `
            }
            await sendEmail(additionalEmail);
            res.json({
                status: 'success',
                code: 200,
                message: 'Additional verification email sent.'
            })
        }
        throw new BadRequest('Verification token is not valid');
    }
    throw new NotFound('User not found');
};

module.exports = additionalVerify;