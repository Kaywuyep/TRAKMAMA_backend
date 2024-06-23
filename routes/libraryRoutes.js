const express = require("express");
// const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin")
const libraryRouter = express.Router();
const  {
    createLibrary,
    getLibraries,
    getLibrary,
    updateLibrary,
    deleteLibrary 
} = require('../controllers/libraryController');


/**
 * @swagger
 * /api/library:
 *   post:
 *     summary: Create a library
 *     tags:
 *       - library
 *     parameters:
 *          - in: body
 *            name: new library
 *            required: true
 *            description: the library to create
 *            schema:
 *              type: object   
 *              properties: 
 *               title:
 *                 type: string
 *               contentType:
 *                 type: string
 *               format:
 *                 type: string
 *               link:
 *                 : string
 *     responses:
 *         201:
 *           description: library created successfully
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                              contentType:
 *                                  type: string
 *                              format:
 *                                  type: string
 *                              link:
 *                                  type: string
 *                              uploadDate:
 *                                  type: string
 *                                  format: date
 *                              category:
 *                                  type: string
 *                              week:
 *                                  type: integer
 *                              description: 
 *                                  type: string
 *          
 */
libraryRouter.post('/', isAdmin, createLibrary);

/**
 * @swagger
 * /api/library/allLibraries:
 *   get:
 *     summary: Return a list of libraries
 *     tags:
 *       - library
 *     responses:
 *       200:
 *         description:  Return a comprehensive list of all libraries.
 *         content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  title:
 *                                      type: string
 *                                  contentType:
 *                                      type: string
 *                                  format:
 *                                      type: string
 *                                  link:
 *                                      type: string
 *                                  uploadDate:
 *                                      type: string
 *                                      format: date
 *                                  category:
 *                                       type: string
 *                                  week:
 *                                      type: integer
 *                                  description: 
 *                                      type: string
 *                                
 *           
 *   
 */
libraryRouter.get('/allLibraries', isLoggedIn, isAdmin, getLibraries);

/**
 * @swagger
 * /api/library/{libraryId}:
 *   get:
 *     summary: Return a single library entry by Id
 *     tags:
 *       - library
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: library id
 *     responses:
 *       200:
 *         description: successful  
 *         content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                              contentType:
 *                                  type: string
 *                              format:
 *                                  type: string
 *                              link:
 *                                  type: string
 *                              uploadDate:
 *                                  type: string
 *                                  format: date
 *                              category:
 *                                  type: string
 *                              week:
 *                                  type: integer
 *                              description:
 *                                  type: string
          
 *       400:
 *         description: Library not found
 *          
 *   
 */

libraryRouter.get('/:libraryId', isLoggedIn, isAdmin, getLibrary);


/**
 * @swagger
 * /api/library/{libraryId}/update:
 *   put:
 *     summary: Update a library entry by id
 *     tags:
 *       - library
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The library id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               contentType:
 *                 type: string
 *               format:
 *                 type: string
 *               link:
 *                 type: string
 *               uploadDate:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *               week:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated library entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 contentType:
 *                   type: string
 *                 format:
 *                   type: string
 *                 link:
 *                   type: string
 *                 uploadDate:
 *                   type: string
 *                   format: date
 *                 category:
 *                   type: string
 *                 week:
 *                   type: integer
 *                 description:
 *                   type: string
 *       404:
 *         description: Library not found
 */

libraryRouter.put('/:libraryId/update', isAdmin, updateLibrary);

/** 
* @swagger
* /api/library/{libraryId}:
*   delete:
*     summary: Delete a library entry by Id
*     tags:
*       - library
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: The library ID
*     responses:
*       200:
*         description: The deleted library
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 title:
*                   type: string
*                 contentType:
*                   type: string
*                 format:
*                   type: string
*                 link:
*                   type: string
*                 uploadDate:
*                   type: string
*                   format: date
*                 category:
*                   type: string
*                 week:
*                   type: integer
*                 description:
*                   type: string
*       404:
*         description: Library not found
*/
libraryRouter.delete('/:libraryId/delete', isAdmin, deleteLibrary);

module.exports = libraryRouter;