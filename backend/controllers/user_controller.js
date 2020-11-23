'use strict';
var user_service = require('../services/user');

// Controller for '/register' endpoint
exports.register = function (req, res) {
    if (!req.body.email) {
        res.status(400).send({ status: 'failed', message: 'email parameters is missing from request' });
    } else {
        user_service.login(req.body, function (err, user_account_info) {
            if (err)
                res.send(err);
            res.end(user_account_info);
        })
    }
};

// Controller for '/login' endpoint
exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ status: 'failed', message: 'Your email or password is missing from request' });
    } else {

        /*Inspection.get_inspection(req.body, function (err, specific_inspection) {
            if (err)
                res.send(err);
            res.json(specific_inspection);
        });*/

    }
};
