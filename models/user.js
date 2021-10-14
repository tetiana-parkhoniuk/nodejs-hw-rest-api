const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { SECRET_KEY } = process.env;

const userSchema = Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null
    },
    avatarURL: {
        type: String,
    },
}, { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.createToken = function () {
    const payload = {
        _id: this._id
    };
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
}

userSchema.methods.createGravatar = function () {
    this.avatarURL = gravatar.url(this.email, { s: '250' }, true);
}

userSchema.methods.editAvatar = function (filePath) {
    const avatar = jimp.read(filePath);
    avatar
        .autocrop()
        .cover(
            250,
            250,
            jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE,
        ).writeAsync(filePath);
};

const userJoiSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().min(1).required()
});

const updateSubscriptionJoiSchema = Joi.object({
    subscription: Joi.string().required()
})

const User = model('user', userSchema);

module.exports = {
    userJoiSchema,
    updateSubscriptionJoiSchema,
    User
}