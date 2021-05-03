const express = require('express');
const router = express.Router();

const profiles = require('../controllers/profile.controller.js');

// Create a new Profile
router.post('/profiles', profiles.create);

router.get('/profiles', profiles.findAll);

router.get('/profiles/:profileId', profiles.findOne);

router.put('/profiles/:profileId', profiles.update);

router.delete('/profiles/:profileId', profiles.delete);

module.exports = router;