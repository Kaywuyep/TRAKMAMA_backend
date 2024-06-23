const express = require("express");
// const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin")
const calendarRouter = express.Router();
const {
    createCalendarEvent,
    getCalendarEvents,
    getCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent
} = require('../controllers/calendarEventController');


/**
 * @swagger
 * /api/calendar-events/create:
 *   post:
 *     summary: creat a new calendar event
 *     tags:
 *       - calendar-events
 *     parameters:
 *          - in: body
 *            name: new calendarEvent
 *            required: true
 *            description: the calendar event to create
 *            schema:
 *              type: object   
 *              properties: 
 *               user:
 *                 type: string
 *               eventTitle:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date
 *               endTime:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               eventType:
 *                 type: string
 *     responses:
 *         201:
 *           description: support group created successfully
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  type: string
 *                              eventTitle:
 *                                  type: string
 *                              startTime:
 *                                  type: string
 *                                  format: date
 *                              endTime:
 *                                  type: string
 *                                  format: date
 *                              description:
 *                                  type: string
 *                              eventType:
 *                                  type: string
 *                              timestamp:
 *                                  type: string
 *                                      
 *          
 */
calendarRouter.post('/', isLoggedIn, createCalendarEvent);

/**
 * @swagger
 * /api/calendar-events/{id}:
 *   get:
 *     summary: Return all calendar events for a user
 *     tags:
 *       - calendar-events
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
 *                              user:
 *                                  type: string
 *                              eventTitle:
 *                                  type: string
 *                              startTime:
 *                                  type: string
 *                                  format: date
 *                              endTime:
 *                                  type: string
 *                                  format: date
 *                              description:
 *                                  type: string
 *                              eventType:
 *                                  type: string
 *                              timestamp:
 *                                  type: string
 *       400:
 *         description: Event not found
 *          
 *   
 */
calendarRouter.get('/:userId', isLoggedIn, getCalendarEvents);

/**
 * @swagger
 * /api/calendar-events/{eventId}:
 *   get:
 *     summary: Return a calendar events by Id
 *     tags:
 *       - calendar-events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: event id
 *     responses:
 *       200:
 *         description: successful  
 *         content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              user:
 *                                  type: string
 *                              eventTitle:
 *                                  type: string
 *                              startTime:
 *                                  type: string
 *                                  format: date
 *                              endTime:
 *                                  type: string
 *                                  format: date
 *                              description:
 *                                  type: string
 *                              eventType:
 *                                  type: string
 *                              timestamp:
 *                                  type: string
 *       400:
 *         description: Event not found
 *          
 *   
 */
calendarRouter.get('/:eventId', isLoggedIn, getCalendarEvent);

/**
 * @swagger
 * /api/calendar-events/{eventId}/update:
 *   put:
 *     summary: Update a calendar event by Id
 *     tags:
 *       - calendar-events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               eventTitle:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date
 *               endTime:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               eventType:
 *                 type: string
 *               timestamp:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated calendar event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 eventTitle:
 *                   type: string
 *                 startTime:
 *                   type: string
 *                   format: date
 *                 endTime:
 *                   type: string
 *                   format: date
 *                 description:
 *                   type: string
 *                 eventType:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *       404:
 *         description: Event not found
 */

calendarRouter.put('/:eventId/update', isLoggedIn, updateCalendarEvent);


/** 
* @swagger
* /api/calendar-events/{eventId}/delete:
*   delete:
*     summary: Delete a calendar event by ID
*     tags:
*       - calendar-events
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: The event ID
*     responses:
*       200:
*         description: The deleted event
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 user:
*                   type: string
*                 eventTitle:
*                   type: string
*                 startTime:
*                   type: string
*                   format: date
*                 endTime:
*                   type: string
*                   format: date
*                 description:
*                   type: string
*                 eventType:
*                   type: string
*                 timestamp:
*                   type: string
*       404:
*         description: Event not found
*/
calendarRouter.delete('/:eventId/delete', isLoggedIn, deleteCalendarEvent);

module.exports = calendarRouter;