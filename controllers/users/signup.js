const { Conflict } = require('http-errors');
const { User } = require('../../models');
const { sendEmail, verificationEmail} = require('../../helpers');

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
    const letter = await verificationEmail(email, verificationToken);

    await sendEmail(letter);

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