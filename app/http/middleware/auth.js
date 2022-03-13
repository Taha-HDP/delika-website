const config = require("config");
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token){
     return res.status(401).send("شما اجازه دسترسی ندارید");}
    try {
        const user = jwt.verify(token, config.get("jwtPrivetKey"));
        req.user = user;
        next();
    } catch (ex) {
        return res.status(401).send("شما اجازه دسترسی ندارید");
    }

}