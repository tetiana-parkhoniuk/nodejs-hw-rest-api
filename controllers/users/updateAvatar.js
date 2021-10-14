const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public/avatars');

const updateAvatar = async (req, res) => {
    const { path: tempName, originalname } = req.file;
    const { _id } = req.user;
    try {
        const [extension] = originalname.split('.').reverse();
        const newAvatarName = `user_${req.user._id}_avatar.${extension}`;
        const originalAvatar = await jimp.read(tempName);
        const resizedAvatar = await originalAvatar.cover(250, 250);

        await resizedAvatar.write(`${avatarsDir}/${newAvatarName}`);
        fs.unlink(tempName);

        const avatarURL = path.join('/avatars', newAvatarName);
        const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

        res.status(200).json({
            status: 'success',
            code: 200,
            data: {
                avatarURL: result.avatarURL
            },
        });
    } catch (error) {
        await fs.unlink(tempName);
        throw error;
    }
};

module.exports = updateAvatar;