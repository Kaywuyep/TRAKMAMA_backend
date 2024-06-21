const express = require("express");
// const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin")
const trakerRouter = express.Router();
const  {
    createTracker,
    getTrackers,
    getTracker,
    updateTracker,
    deleteTracker
} = require('../controllers/pregTrackerCtrl');


/**
 * @swagger
 * /api/trackers:
 *   post:
 *     summary: Create a new tracker entry
 *     tags:
 *       - trackers
 *     parameters:
 *          - in: body
 *            name: new Tracker
 *            required: true
 *            description: the tracker entry to create
 *            schema:
 *              type: object   
 *              properties: 
 *               username:
 *                 type: string
 *               type:
 *                 type: string
 *               data:
 *                 type: string
 *               dateRecorded:
 *                 type: string
 *                 format: date
 *     responses:
 *         201:
 *           description: tracker entry created successfully
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                              type:
 *                                  type: string
 *                              data:
 *                                  type: string
 *                              dateRecorded:
 *                                  type: string
 *                                  format: date
 */
trakerRouter.post('/', isLoggedIn, createTracker);


/**
 * @swagger
 * /api/trackers/{id}:
 *   get:
 *     summary: Return all tracker entries for a user
 *     tags:
 *       - trackers
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
 *                              type:
 *                                  type: string
 *                              data:
 *                                  type: string
 *                              dateRecorded:
 *                                  type: string
 *                                  format: date
 *       400:
 *         description: Tracker not found
 *          
 *   
 */
trakerRouter.get('/:userId', isLoggedIn, getTrackers);

/**
 * @swagger
 * /api/trackers/{trackerId}:
 *   get:
 *     summary: Return a single tracker entry by id
 *     tags:
 *       - trackers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: tracker id
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
 *                              type:
 *                                  type: string
 *                              data:
 *                                  type: string
 *                              dateRecorded:
 *                                  type: string
 *                                  format: date
 *       400:
 *         description: Tracker not found
 *          
 *   
 */
trakerRouter.get('/:trackerId', isAdmin, getTracker);

/**
 * @swagger
 * /api/trackers/{trackerId}/update:
 *   put:
 *     summary: Update a tracker entry by Id
 *     tags:
 *       - trackers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The tracker id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               type:
 *                 type: string
 *               data:
 *                 type: string
 *               dateRecorded:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: The updated tracker entry 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 type:
 *                   type: string
 *                 data:
 *                   type: string
 *                 dateRecorded:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Tracker not found
 */
trakerRouter.put('/:trackerId/update', isLoggedIn, updateTracker);

/** 
* @swagger
* /api/trackers/{trackerId}/delete:
*   delete:
*     summary: Delete a tracker entry by ID
*     tags:
*       - trackers
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: The tracker ID
*     responses:
*       200:
*         description: The deleted tracker entry
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 username:
*                   type: string
*                 type:
*                   type: string
*                 data:
*                   type: string
*                 dateRecorded:
*                   type: string
*       404:
*         description: Tracker not found
*/
trakerRouter.delete('/:trackerId/delete', isLoggedIn, isAdmin, deleteTracker);

module.exports = trakerRouter;