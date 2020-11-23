'use strict';
var crypto = require('crypto');

// User Utils Constructor
var user_utils = function () { };

// Generating random token for Authentication header
user_utils.generate_token = function () {
    let length = 20;
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Getting expirey timestamp of 24 hours from now
user_utils.get_expiry = function () {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
}

// Creating Hash
var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

// Salt Password
user_utils.saltHashPassword = function (user_password, salt) {
    var passwordData = sha512(user_password, salt);
    return passwordData.passwordHash;
}

// Getting random string
user_utils.genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};

// Exporting of module
module.exports = user_utils