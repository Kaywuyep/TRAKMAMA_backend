const User = require("../models/usermodel");

const isAdmin = async (req, res, next) => {
    try {
        //find the login user
        const user = await User.findById(req.userAuthId);
        //check if admin
        if (user.isAdmin) {
            next();
        }
    } catch (error) {
        next(new Error("Access denied, admin only"));
  }
};

module.exports = isAdmin;
