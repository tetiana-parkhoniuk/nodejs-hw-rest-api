const { Conflict } = require('http-errors');
const Mailgen = require('mailgen');
const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email is already in use.")
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.createGravatar();
    newUser.createVerificationToken();
    await newUser.save();

    const { verificationToken } = newUser;
    const verificationEmail = {
        to: email,
        subject: 'Email Verification',
        html: `
        <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click here to confirm your email address</a>
        `
    }

    await sendEmail(verificationEmail);

    res.status(201).json({
        status: 'success',
        code: 201,
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
};

module.exports = signup;