const verificationEmail = async (email, verificationToken) => {
    const verificationEmail = {
        to: email,
        subject: 'Email Verification',
        html: `
            <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">
            Click here to confirm your email address</a>
        `
    }
    return verificationEmail;          
};

module.exports = verificationEmail;