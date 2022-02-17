import express from 'express'
import userCtrl from '../controllers/userController.js'
import authCtrl from '../controllers/authController.js'

const router = express.Router()

router.route('/')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/photo/:userId')
    .get(userCtrl.photo)


router.route('/findpeople/:userId')
    .get(authCtrl.requireSignin, userCtrl.findPeople)

router.route('/follow')
    .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)

router.route('/unfollow')
    .put(authCtrl.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower)

router.route('/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)



export default router