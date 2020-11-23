// Importing of necessary component modules
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  // Component Constructor
  constructor(
    private http: HttpClient
    ) { }

  // Lifecycle function thats called when component is loaded
  ngOnInit(): void {

    // Get user id from memory
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id)

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

}
