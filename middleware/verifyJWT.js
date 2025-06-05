import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;

const verifyJWT = (req, res, next) => {
    const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")) return res.status(401).json({"message": "Unauthorized"});
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if(err) return res.status(401).json({"message": err.message});
            req.firstname = decoded.firstname
            req.lastname = decoded.lastname
            req.email = decoded.email
            req.roles = decoded.roles
            next()
        }
    )
}

export default verifyJWT;