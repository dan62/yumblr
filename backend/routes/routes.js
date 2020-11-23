// Importing of necessary modules
var fs = require('fs');
var path = require('path');
var unzipper = require('unzipper');

'use strict';
module.exports = function (app) {

    var users = require('../controllers/user_controller');
    var blogs = require('../controllers/blog_controller');

    // Addition of multer to handle uplaods
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: "./uploads/",
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });
    const upload = multer({ storage });

    // TEST ROUTE
    // status:
    app.get('/', function (request, response) {
        console.log(request.body);
        response.send({ "Application_title": "Yumblr Backend REST API", "version": "0.0.1" });
    });


    // USER ROUTES

    // 1. User register using username (password will be automatically generated)
    // status:
    app.route('/register')
        .post(users.register);

    // 2. Login to user account
    // status: Working
    app.route('/login')
        .post(users.register);


    // USER ROUTES

    // 3. Create Blog Post 
    // status: Working
    app.route('/create_blog_post')
        .post(blogs.create_blog_post);

    // 4. Delete Blog Post
    // status: Working
    app.route('/delete_blog_post')
        .delete(blogs.delete_blog);

    // 5. Update Blog Post
    // status:
    app.route('/update_blog_post')
        .post(blogs.update_blog);

    // 6. Update Blog Post
    // status: Working
    app.route('/list_blog_posts')
        .get(blogs.list_blogs);

    // 7. View user Blog Posts
    // status: 
    app.route('/list_user_blog_posts')
        .post(blogs.view_user_specific_blogs);

};