const express = require("express");
const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const trakRouter = express.Router();

const {
    createPregnancyTracking,
    getPregnancyTracking,
    getPregnancyTrackingById,
    updatePregnancyTracking,
} = require("../controllers/trakController");

trakRouter.get("/", isLoggedIn, getPregnancyTracking);
trakRouter.get("/:id", isLoggedIn, getPregnancyTrackingById);
trakRouter.post("/user/:id/newtracking", isLoggedIn, createPregnancyTracking);
trakRouter.put("/update/:id", isLoggedIn, updatePregnancyTracking);

module.exports = trakRouter;