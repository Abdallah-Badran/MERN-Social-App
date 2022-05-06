import express from "express"
import userCtrl from "../controllers/user.js"
import authCtrl from "../controllers/authController.js"
import postCtrl from "../controllers/postCtrl.js"

const router = express.Router()

router.route('/new/:userId').post(authCtrl.authenticate, postCtrl.create, postCtrl.list)
router.route('/').get(authCtrl.authenticate, postCtrl.list)

router.route('/like').put(authCtrl.authenticate, postCtrl.like, postCtrl.list)
router.route('/unlike').put(authCtrl.authenticate, postCtrl.unlike, postCtrl.list)
router.route('/comment').put(authCtrl.authenticate, postCtrl.comment, postCtrl.list)
router.route('/uncomment').put(authCtrl.authenticate, postCtrl.uncomment, postCtrl.list)
router.route('/:postId').delete(authCtrl.authenticate, postCtrl.isPoster, postCtrl.remove, postCtrl.list)

router.param('userId', userCtrl.getId)
router.param('postId', postCtrl.postByID)

export default router