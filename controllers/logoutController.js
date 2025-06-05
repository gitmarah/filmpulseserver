import Users from '../models/Users.js';

const logoutController = async (req, res) => {
    const refreshToken = req?.cookies?.refreshToken;
    if(!refreshToken) return res.sendStatus(204);

    const user = await Users.findOne({ refreshToken }).exec();
    if(!user) {
        res.clearCookie('refreshToken', {httpOnly: true});
        return res.sendStatus(204);
    }

    user.refreshToken = "";
    await user.save();
    res.clearCookie('refreshToken', {httpOnly: true});
    res.sendStatus(204)
}

export default logoutController;