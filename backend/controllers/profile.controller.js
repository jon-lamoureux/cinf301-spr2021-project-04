const Profile = require('../models/profile.model.js');

exports.create = (req, res) => {
    if (!req.body.username) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }
    if (!req.body.userbirthday) {
        return res.status(400).send({
            message: "User brithday can not be empty"
        });
    }
    if (!req.body.userid) {
        return res.status(400).send({
            message: "User ID can not be empty"
        });
    }
    if (!req.body.userlocation) {
        return res.status(400).send({
            message: "User location can not be empty"
        });
    }
    if (!req.body.allowemails) {
        return res.status(400).send({
            message: "Email opt-in preference must be 0 or 1"
        });
    }


    const profile = new Profile({
        username: req.body.username,
        userbirthday: req.body.userbirthday,
		userid: req.body.userid,
		userlocation: req.body.userlocation,
		allowemails: req.body.allowemails
    });

    profile.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Profile."
            });
        });
};

exports.findAll = (req, res) => {
    Profile.find()
        .then(profiles => {
            res.send(profiles);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving profiles."
            });
        });
};

exports.findOne = (req, res) => {
    Profile.findById(req.params.profileId)
        .then(profile => {
            if (!profile) {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params.profileId
                });
            }
            res.send(profile);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params.profileId
                });
            }
            return res.status(500).send({
                message: "Error retrieving profile with id " + req.params.profileId
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.username) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }
    if (!req.body.userbirthday) {
        return res.status(400).send({
            message: "User brithday can not be empty"
        });
    }
    if (!req.body.userid) {
        return res.status(400).send({
            message: "User ID can not be empty"
        });
    }
    if (!req.body.userlocation) {
        return res.status(400).send({
            message: "User location can not be empty"
        });
    }
    if (!req.body.allowemails) {
        return res.status(400).send({
            message: "Email opt-in preference must be 0 or 1"
        });
    }

    Profile.findByIdAndUpdate(req.params.profileId, {
        username: req.body.username,
        userbirthday: req.body.userbirthday,
		userid: req.body.userid,
		userlocation: req.body.userlocation,
		allowemails: req.body.allowemails
    }, { new: true })
        .then(profile => {
            if (!profile) {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params.profileId
                });
            }
            res.send(profile);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params.profileId
                });
            }
            return res.status(500).send({
                message: "Error updating profile with id " + req.params.profileId
            });
        });
};

exports.delete = (req, res) => {
    Profile.findByIdAndRemove(req.params.profileId)
        .then(profile => {
            if (!profile) {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params.profileId
                });
            }
            res.send({ message: "Profile deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params.profileId
                });
            }
            return res.status(500).send({
                message: "Could not delete profile with id " + req.params.profileId
            });
        });
};
