const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const JobController = require('../controllers/job')
const ApplyController = require('../controllers/apply')
const passport = require('../auth/auth')

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.put('/user', passport.auth, UserController.updateUser)
    //router.delete('/user', passport.auth, UserController.deleteUser)

router.post('/savejob', passport.auth, JobController.saveJob)
router.get('/jobs', JobController.getJobs)
router.get('/job/:id', JobController.getJob)
router.put('/job/:id', passport.auth, JobController.updateJob)
router.delete('/job/:id', passport.auth, JobController.deleteJob)

router.get('/candidates/:id', passport.auth, UserController.getUsersByOffer)
router.get('/user/myoffers', passport.auth, UserController.myOffers)

router.post('/job/apply/:id', passport.auth, ApplyController.registerOffer)
router.delete('/job/apply/:id', passport.auth, ApplyController.deleteOffer)

module.exports = router