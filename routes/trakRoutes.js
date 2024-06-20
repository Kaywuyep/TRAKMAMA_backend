const express = require("express");
const trakmama = require("../models/trakModel")
const User = require("../models/usermodel");

const isLoggedIn = require("../middlewares/isLoggedIn");
const trakRouter = express.Router();

const {
    createPregnancyTracking,
    getPregnancyTracking,
    getPregnancyTrackingById,
    updatePregnancyTracking,
} = require("../controllers/trakController");


/**
 * @swagger
 * /api/trakmama:
 *   get:
 *     summary: Return a list of trakmama
 *     tags:
 *       - trakmama
 *     responses:
 *       200:
 *         description:  Return a comprehensive list of all trakmama.
 *         content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  username:
 *                                      type: string
 *                                  dueDate:
 *                                      type: string
 *                                      format: date
 *                                  lastMenstrualPeriod:
 *                                      type: string
 *                                      format: date
 *                                  currentWeek:
 *                                       type: integer
 *                                  weightGain:
 *                                      type: integer
 *                                  symptons: 
 *                                      type: string
 *                                  appointment:
 *                                      type: string
 *                                      formate: date
 *                                  notes:
 *                                      type: string
 *                                
 *           
 *   
 */
trakRouter.get("/", isLoggedIn, getPregnancyTracking);

/**
 * @swagger
 * /api/trakmama/{id}:
 *   get:
 *     summary: Return tracking data by id
 *     tags:
 *       - trakmama
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: user id
 *     responses:
 *       200:
 *         description: successful  
 *         content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                              dueDate:
 *                                  type: string
 *                                  format: date
 *                              lastMenstrualPeriod:
 *                                  type: string
 *                                  format: date
 *                              currentWeek:
 *                                  type: integer
 *                              weightGain:
 *                                  type: integer
 *                              symptoms:
 *                                  type: string
 *                              appointment:
 *                                  type: string
 *                                  format: date
 *                              note:
 *                                  type: string
          
 *       400:
 *         description: Tracking data does not exist
 *          
 *   
 */
trakRouter.get("/:id", isLoggedIn, getPregnancyTrackingById);
/**
 * @swagger
 * /api/trakmama/user/{id}/newtracking:
 *   post:
 *     summary: Add a new pregnancy tracking
 *     tags:
 *       - trakmama
 *     parameters:
 *          - in: body
 *            name: newTraking
 *            required: true
 *            description: The tracking data
 *            schema:
 *              type: object   
 *              properties: 
 *               username:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               lastMenstrualPeriod:
 *                 type: string
 *                 format: date
 *               currentWeek:
 *                 type: integer
 *               weightGain:
 *                 type: integer
 *               symptoms:
 *                 type: string
 *               appointment:
 *                 type: string
 *                 formate: date
 *     responses:
 *         201:
 *           description: user created successfully
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                              dueDate:
 *                                  type: string
 *                                  format: date
 *                              lastMenstrualPeriod:
 *                                  type: string
 *                                  format: date
 *                              currentWeek:
 *                                  type: integer
 *                              weightGain:
 *                                  type: integer
 *                              symptoms:
 *                                  type: string
 *                              appointment:
 *                                  type: string
 *                                  format: date
 *                              note: 
 *                                  type: string
 *          
 */
trakRouter.post("/user/:id/newtracking", isLoggedIn, createPregnancyTracking);


/**
 * @swagger
 * /api/trakmama/{id}:
 *   put:
 *     summary: Update a tracked data
 *     tags:
 *       - trakmama
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               lastMenstrualPeriod:
 *                 type: string
 *                 format: date
 *               currentWeek:
 *                 type: integer
 *               weightGain:
 *                 type: integer
 *               symptoms:
 *                 type: string
 *               appointment:
 *                 type: string
 *                 format: date
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated tracked data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                 lastMenstrualPeriod:
 *                   type: string
 *                   format: date
 *                 currentWeek:
 *                   type: integer
 *                 weightGain:
 *                   type: integer
 *                 symptoms:
 *                   type: string
 *                 appointment:
 *                   type: string
 *                   format: date
 *                 note: 
 *                   type: string
 *       404:
 *         description: No such data
 */




trakRouter.put("/update/:id", isLoggedIn, updatePregnancyTracking);

module.exports = trakRouter;