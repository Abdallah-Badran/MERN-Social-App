import express from 'express'
import authCtrl from '../controllers/authController.js'

const router = express.Router()

// POST request to authenticate the user with their email and password
router.route('/signin')
    .post(authCtrl.signin)

// GET request to clear the JWT that was set on the response object after sign-in
router.route('/signout')
    .get(authCtrl.signout)

export default router