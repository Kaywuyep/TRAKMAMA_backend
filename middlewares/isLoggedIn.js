const { verifyToken } = require("../utils/verifytoken");

const isLoggedIn = (req, res, next) => {
    try {
        //verify the token
        const decodedUser = verifyToken(token);
        if (!decodedUser) {
            throw new Error("Invalid/Expired token, please login again");
        } else {
            //save the user into req obj
            req.userAuthId = decodedUser?.id;
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};
 module.exports = isLoggedIn;