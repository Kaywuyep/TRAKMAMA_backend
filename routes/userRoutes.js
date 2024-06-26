const express = require("express");
const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

const {
    getUsers,
    getUserProfile,
    registerUser,
    loginUser,
    updateById,
    deleteUsers,
} = require("../controllers/userController");




/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Return a list of users
 *     tags: 
 *       - users
 *     responses:
 *       200:
 *         description:  Return a comprehensive list of all users.
 *         content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  firstName:
 *                                      type: string
 *                                  lastName:
 *                                      type: string
 *                                  username:
 *                                      type: string
 *                                  email:
 *                                      type: string
 *                                  phone: 
 *                                      type: string
 *                                  password:
 *                                      type: string
 *                                  roles:
 *                                      type: string
 *                                  isAdmin:
 *                                      type: boolean

 *           
 *   
 */

router.get("/", getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Return user profile
 *     tags:
 *       - users
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
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              username:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              phone:
 *                                  type: integer
 *                              password:
 *                                  type: string
 *                              roles:
 *                                  type: string
 *                              isAmin:
 *                                  type: boolean
          
 *       400:
 *         description: No such user
 *          
 *   
 */

router.get("/:id", isLoggedIn, getUserProfile);

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Signup a new user.
 *     tags:
 *       - users
 *     parameters:
 *          - in: body
 *            name: newUser
 *            required: true
 *            description: the user to create
 *            schema:
 *              type: object   
 *              properties: 
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *         201:
 *           description: user created successfully
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              username:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              phone:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                              roles:
 *                                  type: string
 *                              isAdmin: 
 *                                  type: boolean
 *          
 */

router.post("/signup", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: login a user.
 *     tags:
 *       - users
 *     parameters:
 *          - in: body
 *            name: User
 *            required: true
 *            description: login registered user
 *            schema:
 *              type: object   
 *              properties: 
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *         201:
 *           description: user logged in successfully
 *           content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              username:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              phone:
 *                                  type: string
 *                              password:
 *                                  type: string
 *                              roles:
 *                                  type: string
 *                              isAdmin: 
 *                                  type: boolean
 *          
 */

router.post("/login", loginUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a registered user
 *     tags:
 *       - users
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               roles:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 password:
 *                   type: string
 *                 roles:
 *                   type: string
 *                 isAdmin: 
 *                   type: boolean
 *       404:
 *         description: No such user
 */

router.put("/update/:id", isLoggedIn, updateById)

/** 
* @swagger
* /api/users/{id}:
*   delete:
*     summary: Delete a user by ID
*     tags:
*       - users
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: The user ID
*     responses:
*       200:
*         description: The deleted user
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 firstName:
*                   type: string
*                 lastName:
*                   type: string
*                 username:
*                   type: string
*                 email:
*                   type: string
*                 phone:
*                   type: string
*                 password:
*                   type: string
*                 roles:
*                   type: string
*                 isAdmin:
*                   type: boolean
*       404:
*         description: No such user
*/
router.delete("/delete/:id", isLoggedIn, deleteUsers);


module.exports = router;