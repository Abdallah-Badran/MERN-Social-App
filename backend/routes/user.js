import express from 'express'
import userCtrl from '../controllers/user.js'
import authCtrl from '../controllers/authController.js'

const router = express.Router()

router.route('/').post(userCtrl.create)
router.route('/list').get(userCtrl.list)
router.route('/load').get(authCtrl.authenticate, userCtrl.userByID, userCtrl.read)

router.route('/follow')
    .put(authCtrl.authenticate, userCtrl.addFollowing, userCtrl.addFollower, userCtrl.list)
router.route('/unfollow')
    .put(authCtrl.authenticate, userCtrl.removeFollowing, userCtrl.removeFollower, userCtrl.list)

router.route('/:userId').put(authCtrl.authenticate, authCtrl.authorize, userCtrl.update)




router.param('userId', userCtrl.getId)

export default router