import express from 'express'
import userCtrl from '../controllers/userController.js'
import authCtrl from '../controllers/authController.js'
import postCtrl from '../controllers/postController.js'

const router = express.Router()

router.route('/new/:userId')
    .post(authCtrl.requireSignin, postCtrl.create)

router.route('/photo/:postId')
    .get(postCtrl.photo)

router.route('/by/:userId')
    .get(authCtrl.requireSignin, postCtrl.listByUser)

router.route('/feed/:userId')
    .get(authCtrl.requireSignin, postCtrl.listNewsFeed)

router.route('/like')
    .put(authCtrl.requireSignin, postCtrl.like)
router.route('/unlike')
    .put(authCtrl.requireSignin, postCtrl.unlike)

router.route('/comment')
    .put(authCtrl.requireSignin, postCtrl.comment)
router.route('/uncomment')
    .put(authCtrl.requireSignin, postCtrl.uncomment)

router.route('/:postId')
    .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)

export default router