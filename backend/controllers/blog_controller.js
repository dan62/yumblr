'use strict';
var blog_service = require('../services/blog');
var auth_utils = require('../utils/auth_utils');

// Controller for endpoint 3 : Authentication Added
exports.create_blog_post = function (req, res) {
    if (!req.body.author_id) {
        res.status(400).send({ status: 'failed', message: 'Your author_id is missing please check and try again' });
    } else
        // Check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
            return res.status(401).json({ status: "failed", message: 'Missing Authorization Header' });
        } else {
            // Get authentication token 
            let auth_token = req.headers.authorization.split(' ')[1];
            // Using auth util to validate the authentication header
            auth_utils.is_auth_valid(req.body.author_id, auth_token, function (response, callback) {
                if (response.message == "auth header is valid") {
                    // Get inspections when header is validated
                    blog_service.generate_blog_post(req.body, function (err, generated_blog) {
                        if (err)
                            res.send(err);
                        res.json(generated_blog);
                    })
                } else {
                    res.json(response)
                }
            });
        }
};

// Controller for endpoint 4 : Authentication added
exports.delete_blog = function (req, res) {
    if (!req.body.author_id || !req.body.blog_id) {
        res.status(400).send({ status: 'failed', message: 'Your author_id or blog_id is missing please check and try again' });
    } else {
        // Check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
            return res.status(401).json({ status: "failed", message: 'Missing Authorization Header' });
        } else {
            // Get authentication token 
            let auth_token = req.headers.authorization.split(' ')[1];
            // Using auth util to validate the authentication header
            auth_utils.is_auth_valid(req.body.author_id, auth_token, function (response, callback) {
                if (response.message == "auth header is valid") {
                    blog_service.delete_blog_post(req.body, function (err, blog_deletion) {
                        if (err)
                            res.send(err);
                        res.json(blog_deletion);
                    });
                } else {
                    res.json(response)
                }
            });
        }
    }
};

// Controller for endpoint 5 : Authentication added
exports.update_blog = function (req, res) {
    if (!req.body.author_id || !req.body.title || !req.body.status || !req.body.category || !req.body.content) {
        res.status(400).send({ status: 'failed', message: 'Your author_id, title, status, category or content is missing from request please check and try again' });
    } else {

        if (!req.headers.authorization) {
            res.status(400).send({ status: 'failed', message: 'Missing Authorization Header' });
        } else {
            // Get authentication token 
            let auth_token = req.headers.authorization.split(' ')[1];
            // Using auth util to validate the authentication header
            auth_utils.is_auth_valid(req.body.author_id, auth_token, function (response, callback) {
                if (response.message == "auth header is valid") {
                    blog_service.update_blog_post(req.body, function (err, blog_update_callback) {
                        if (err)
                            res.send(err);
                        res.json(blog_update_callback);
                    });
                } else {
                    res.json(response)
                }
            });
        }
    }
};

// Controller for endpoint 6
exports.list_blogs = function (req, res) {
    blog_service.list_blog_posts(function (err, blog_list_callback) {
        if (err)
            res.send(err);
        res.end(blog_list_callback);
    });
};

// Controller for endpoint 7 : Authentication added
exports.view_user_specific_blogs = function (req, res) {
    if (!req.body.user_id) {
        res.status(400).send({ status: 'failed', message: 'Your user_id is missing from request please check and try again' });
    } else {

        if (!req.headers.authorization) {
            res.status(400).send({ status: 'failed', message: 'Missing Authorization Header' });
        } else {
            // Get authentication token 
            let auth_token = req.headers.authorization.split(' ')[1];
            // Using auth util to validate the authentication header
            auth_utils.is_auth_valid(req.body.user_id, auth_token, function (response, callback) {
                if (response.message == "auth header is valid") {
                    blog_service.view_user_blogs(req.body, function (err, view_user_blogs_callback) {
                        if (err)
                            res.send(err);
                        res.end(view_user_blogs_callback);
                    });
                } else {
                    res.json(response)
                }
            });
        }
    }

}