// Importing of necessary component modules
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

// Declaration of component template
@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})

// Exporting of component
export class PodcastComponent implements OnInit {

  // Declaration  of variables
  blog_posts: any;
  user_id: any;
  auth_token: any;
  blogForm: any;
  title: any;
  category: any;
  status: any;
  content: any;

  // Component Constructor
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  // Lifecycle function thats called when component is loaded
  ngOnInit(): void {

    // Get user id from memory
    this.user_id = localStorage.getItem("user_id");
    this.auth_token = localStorage.getItem("TYUIO");
    console.log(this.user_id)

    // Build the form
    this.blogForm = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required])],
      category: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      content: [null, Validators.compose([Validators.required])]
    });

    // Load the users blog posts
    this.get_all_blog_posts();
  }

  // Function used to retreive all blog posts
  get_all_blog_posts() {

    // Blog model
    interface blog {
      status: String,
      message: String,
      blogs: [
        {
          author_id: Number,
        }
      ]
    }

    // API call to server to retreive blog posts
    this.http.get<blog>("http://localhost:3000/list_blog_posts")
      .subscribe(data => {

        var user_id = parseInt(this.user_id)

        this.blog_posts = data.blogs
        this.blog_posts = data.blogs.filter(
          blog => blog.author_id === user_id);
      })
  }

  update_blog(blog_id: any) {

    this.title = this.blogForm.controls['title'].value;
    this.category = this.blogForm.controls['category'].value;
    this.status = this.blogForm.controls['title'].value;
    this.content = this.blogForm.controls['content'].value;

    // API Headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth_token
      })
    };

    // POST parameters for API call
    const postParams = {
      author_id: this.user_id,
      blog_id: blog_id
    };

    this.http.post("http://localhost:3000/update_blog_post", postParams, httpOptions)
      .subscribe(data => {

      })
  }

  delete_blog(blog_id: any) {

    // API Headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth_token
      })
    };

    // POST parameters for API call
    const postParams = {
      author_id: this.user_id,
      blog_id: blog_id
    };

    this.http.post("http://localhost:3000/delete_blog_post", postParams, httpOptions)
      .subscribe(data => {

      })
  }

}
