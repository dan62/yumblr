// Importing of neccessary page modules
'user strict';
var sql = require('../db.js');
var user_utils = require('../utils/user_utils');
var User = function (user) { };

// User Authentication
User.login = function (user_info, result) {

    // Login credentials (Just username as suggested in takehome test)
    let email = user_info.email;

    // Create a rsndom password for users account
    let auth_token = user_utils.generate_token();

    // Check if email is already present in DB
    sql.query(`SELECT * FROM users WHERE email=?`, [email], function (err, account_info) {

        // Database error check
        if (err) {

            let response = {
                status: "failed",
                message: "Database error has occured, when deleting blog post",
                error: err
            }

            result(response)

        } else {

            if (account_info.length == 0) {

                sql.query(`INSERT INTO users (id, email, auth_token) VALUES (null, ?, ?)`
                    , [email, auth_token], function (err, user_profile) {

                        // Database error check
                        if (err) {

                            let response = {
                                status: "failed",
                                message: "Database error has occured, when creating users account",
                                error: err
                            }

                            result(response)

                        } else {

                            let response = {
                                "status": "success",
                                "message": "Account has been successfully created",
                                "user_info": {
                                    "id": user_profile.insertId,
                                    "email": email,
                                    "auth_token": auth_token
                                }
                            }
                            result(response);

                        }
                    });
            } else {

                let response = {
                    "status": "success",
                    "message": "Account with this email already exists",
                    "user_info": account_info[0]
                }
                result(response);

            }
        }
    });


};

// User Registration
User.register = function (user_submission, result) {


}

// Export module
module.exports = User