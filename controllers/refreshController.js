import Users from "../models/Users.js";
import jsonwebtoken from 'jsonwebtoken';
const jwt = jsonwebtoken;

const refreshController = async (req, res) => {
    const { refreshToken } = req?.cookies;
    if(!refreshToken) return res.sendStatus(401);
    const user = await Users.findOne({refreshToken}).exec();
    if(!user) return res.sendStatus(401);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if(err || user.email !== decoded.email) return res.sendStatus(401);
            const userInfo = {firstname: decoded.firstname, lastname: decoded.lastname, email: decoded.email, roles: decoded.roles, id: decoded.id}
            const accessToken = jwt.sign(
                userInfo,
                process.env.ACCESS_TOKEN,
                {expiresIn: "10m"}
            );
            res.json({user: userInfo, token: accessToken});
        }
    );
}

export default refreshController;