// Importing of necessary modules
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANTS } from '../../../services/constants';

// Declaration of component template
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

// Exporting of component module
export class BlogComponent implements OnInit {


  // Variables declaration
  blog_posts: any;

  // component constructor
  constructor(private http: HttpClient) { }

  // LifeCycle function called when page is loaded
  ngOnInit(): void {
    this.get_all_blog_posts();
  }

  // Function used to retreive all blog posts
  get_all_blog_posts() {

    // Blog model
    interface blog {
      status: String,
      message: String,
      blogs: []
    }

    // API call to server to retreive blog posts
    this.http.get<blog>(API_CONSTANTS.BASE_URL_TEST + "/list_blog_posts")
      .subscribe(data => {
        this.blog_posts = data.blogs
      })
  }

}
