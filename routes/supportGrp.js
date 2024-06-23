const express = require('express');
const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin")
const supportRouter = express.Router();
const {
    getAllUsersInGroup,
    createSupportGroup,
    joinSupportGroup,
    postInSupportGroup,
    removeMemberFromGroup,
    deleteGroupById
} = require("../controllers/supportGrpCtrl");


/**
 * @swagger
 * /api/support/members:
 *   get:
 *     summary: Return a list of users in group
 *     tags: 
 *       - supportGroup
 *     responses:
 *       200:
 *         description:  Return a comprehensive list of all users in group
 *         content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  groupName:
 *                                      type: string
 *                                  groupType:
 *                                      type: string
 *                                  description:
 *                                      type: string
 *                                  members:
 *                                      type: string
 *                                  posts: 
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              username: 
 *                                                  type: string
 *                                              content:
 *                                                  type: string
 *                                              timestamps:
 *                                                  type: string
 *                                                  

 *           
 *   
 */

supportRouter.get('/members', isLoggedIn, getAllUsersInGroup);

/**
 * @swagger
 * /api/support/create:
 *   post:
 *     summary: creat a new support group
 *     tags:
 *       - supportGroup
 *     parameters:
 *          - in: body
 *            name: newGroup
 *            required: true
 *            description: the group to create
 *            schema:
 *              type: object   
 *              properties: 
 *               groupName:
 *                 type: string
 *               groupType:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *         201:
 *           description: support group created successfully
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              groupName:
 *                                  type: string
 *                              groupType:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              member:
 *                                  type: string
 *                              posts:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          username:
 *                                              type: string
 *                                          content: 
 *                                              type: string
 *                                          timestamps:
 *                                              type: string
 *          
 */

supportRouter.post('/create', isLoggedIn, createSupportGroup);

/**
 * @swagger
 * /api/support/{groupId}/{id}/join:
 *   post:
 *     summary: joining a support group.
 *     tags:
 *       - supportGroup
 *     parameters:
 *          - in: body
 *            name: User
 *            required: true
 *            description: join a support group
 *            schema:
 *              type: object   
 *              properties: 
 *               id:
 *                 type: string
 *     responses:
 *         201:
 *           description: successfully joined the support group
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              groupName:
 *                                  type: string
 *                              groupType:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              members:
 *                                  type: string
 *                              posts:
 *                                   type: array
 *                                   items:
 *                                      type: object
 *                                      properties:
 *                                          username:
 *                                              type: string
 *                                          content: 
 *                                              type: string
 *                                          timestamps:
 *                                              type: string
 *          
 */

supportRouter.post('/:groupId/users/:id/join', isLoggedIn, joinSupportGroup);

/**
 * @swagger
 * /api/support/{groupId}/{id}/post:
 *   post:
 *     summary: post in support group
 *     tags:
 *       - supportGroup
 *     parameters:
 *          - in: body
 *            name: newPost
 *            required: true
 *            description: make a new post
 *            schema:
 *              type: array
 *              items:
 *                 type: object   
 *                 properties: 
 *                     username:
 *                         type: string
 *                     content:
 *                         type: string
 *     responses:
 *         201:
 *           description: successfully joined the support group
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              groupName:
 *                                  type: string
 *                              groupType:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                              members:
 *                                  type: string
 *                              posts:
 *                                   type: array
 *                                   items:
 *                                      type: object
 *                                      properties:
 *                                          username:
 *                                              type: string
 *                                          content: 
 *                                              type: string
 *                                          timestamps:
 *                                              type: string
 *          
 */

supportRouter.post('/:groupId/users/:id/post', isLoggedIn, postInSupportGroup);

/** 
* @swagger
* /api/support/{groupId}/users/{id}/remove:
*   delete:
*     summary: Remove a member by id
*     tags:
*       - supportGroup
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: The user ID
*     responses:
*       200:
*         description: The deleted member
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 groupName:
*                   type: string
*                 groupType:
*                   type: string
*                 description:
*                   type: string
*                 members:
*                   type: string
*                 posts:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                         username:
*                             type: string
*                         content:
*                             type: string
*                         timestamps:
*                             type: string
*       404:
*         description: Support group not found
*/
supportRouter.delete('/:groupId/users/:id/remove', isLoggedIn, isAdmin, removeMemberFromGroup);


/** 
* @swagger
* /api/support/{groupId}/delete:
*   delete:
*     summary: Delete group by id
*     tags:
*       - supportGroup
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: The group id
*     responses:
*       200:
*         description: group succesfully deleted
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 groupName:
*                   type: string
*                 groupType:
*                   type: string
*                 description:
*                   type: string
*                 members:
*                   type: string
*                 posts:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                         username:
*                             type: string
*                         content:
*                             type: string
*                         timestamps:
*                             type: string
*       404:
*         description: Support group not found
*/
supportRouter.delete('/:groupId/delete', isLoggedIn, isAdmin, deleteGroupById)


module.exports = supportRouter; 
