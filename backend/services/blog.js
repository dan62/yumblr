// Importing of neccessary page modules
'user strict';
var sql = require('../db.js');
var Blog = function (blog) { };

// Create Blog Post
Blog.generate_blog_post = function (blog_info, result) {

    // Get authors ID
    let author_id = blog_info.author_id;

    // Blog Info
    let title = blog_info.title;
    let status = blog_info.status;
    let category = blog_info.category;
    let content = blog_info.content;

    sql.query(`INSERT INTO blog (id, author_id, title, status, category, content)
     VALUES (null, ?, ?, ?, ?, ?)`, [author_id, title, status, category, content], function (err, blog_post) {

        // Database error check
        if (err) {

            let response = {
                status: "failed",
                message: "Database error has occured, when creating blog post",
                error: err
            }

            result(response)

        } else {

            let response = {
                status: "success",
                message: "Blog post has been successfully generated"
            }

            result(response)

        }
    })
};

// Delete Blog Post
Blog.delete_blog_post = function (blog_info, result) {

    // Get authors ID
    let author_id = blog_info.author_id;
    let blog_post_id = blog_info.blog_id;

    sql.query(`SELECT * FROM blog WHERE author_id=? AND id=?`, [author_id, blog_post_id], function (err, blog_post) {

        // Database error check
        if (err) {

            let response = {
                status: "failed",
                message: "Database error has occured, when deleting blog post",
                error: err
            }

            result(response)

        } else {

            if (blog_post.length > 0) {

                sql.query(`DELETE FROM blog WHERE id = ?`, [blog_post_id], function (err, blog_deletion_callback) {

                    // Database error check
                    if (err) {

                        let response = {
                            status: "failed",
                            message: "Database error has occured, when deleting blog post",
                            error: err
                        }

                        result(response)

                    } else {

                        let response = {
                            status: "success",
                            message: "Blog post has been deleted"
                        }

                        result(response)

                    }
                })
            } else {

                let response = {
                    status: "failed",
                    message: "You are not the owner of this blog post"
                }

                result(response)
            }
        }
    })
};

// Update Blog Post
Blog.update_blog_post = function (blog_info, result) {

    // Get authors ID
    let author_id = blog_info.author_id;

    // Blog Info
    let blog_id = blog_info.blog_id;
    let title = blog_info.title;
    let status = blog_info.status;
    let category = blog_info.category;
    let content = blog_info.content;

    sql.query(`SELECT * FROM blog WHERE author_id = ? AND id = ?`, [author_id, blog_id], function (err, blog_post) {

        // Database error check
        if (err) {

            let response = {
                status: "failed",
                message: "Database error has occured, when retreiving blog post info",
                error: err
            }

            result(response)

        } else {

            if (blog_post.length > 0) {

                sql.query(`UPDATE blog SET title=?, status=?, category=? content=? WHERE id = ?`, 
                [title, status, category, content, blog_id], function (err, blog_post_updated) {

                    // Database error check
                    if (err) {

                        let response = {
                            status: "failed",
                            message: "Database error has occured, when updating blog post",
                            error: err
                        }

                        result(response)

                    } else {

                        let response = {
                            status: "success",
                            message: "Blog post has been updated"
                        }

                        result(response)

                    }
                })

            } else {

                let response = {
                    status: "failed",
                    message: "You are not authorized to edit this blog post"
                }

                result(response)
            }

        }
    })
};


// List Blog Posts
Blog.list_blog_posts = function (result) {

    sql.query(`SELECT * FROM blog`, function (err, blog_posts) {

        // Database error check
        if (err) {

            let response = {
                status: "failed",
                message: "Database error has occured, when retreiving blog posts",
                error: err
            }

            result(response)

        } else {

            if(blog_posts.length > 0){
                let response = {
                    status: "success",
                    message: blog_posts.length + " have been retreived",
                    blogs: blog_posts
                }
    
                result(response)
            } else {
                let response = {
                    status: "failed",
                    message: "There are no blog posts available at this time"
                }
    
                result(response)
            }
        }
    })
};

// View user blogs
Blog.view_user_blogs = function (user_info, result) {

    let author_id = user_info.user_id;

    sql.query(`SELECT * FROM blog WHERE author_id = ?`, [author_id], function (err, blog_posts) {

        // Database error check
        if (err) {

            let response = {
                status: "failed",
                message: "Database error has occured, when retreiving blog posts for user",
                error: err
            }

            result(response)

        } else {

            if(blog_posts.length > 0){
                let response = {
                    status: "success",
                    message: blog_posts.length + " have been retreived",
                    blogs: blog_posts
                }
    
                result(response)
            } else {
                let response = {
                    status: "failed",
                    message: "There are no blog posts available at this time"
                }
    
                result(response)
            }
        }
    })
};

// Export module
module.exports = Blog