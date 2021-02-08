var User = require('./Models/user');
require('dotenv').config()

User.findOne({ userName: process.env.DEFAULT_USER_USERNAME })
.exec(async function(error, user) {
    if (error) {
        throw error;
    } else if (!user) {
        var user = new User({
            userName: process.env.DEFAULT_USER_USERNAME,
            password: process.env.DEFAULT_USER_PASSWORD
        });
        try {
            await user.save();
        } catch (error) {
            throw error;
        }
    }
});
