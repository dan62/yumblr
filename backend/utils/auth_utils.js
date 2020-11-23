'use strict';
var sql = require('../db.js');

// Authentication Utils Constructor
var auth_utils = function () { };

// Function to validate authentication header
auth_utils.is_auth_valid = function (user_id, token, response) {

    sql.query("SELECT * FROM users WHERE auth_token = ? AND id = ?", [token, user_id], function (auth_err, associated_session_key) {
        if (auth_err) {
            response({ status: "failed", message: "A database error occured when validating authentication token" })
        } else {
            if (associated_session_key.length > 0) {
                response({ status: "success", message: "auth header is valid" })
            } else {
                response({ status: "failed", message: "Authentication token is invalid" })
            }
        }
    })
}

// Exporting of module
module.exports = auth_utils