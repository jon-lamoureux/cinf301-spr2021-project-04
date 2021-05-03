const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    username: String,
    userbirthday: Date,
	userid: Number,
	userlocation: String,
	allowemails: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);
