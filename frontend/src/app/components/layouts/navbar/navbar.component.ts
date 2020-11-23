// Importing of necessary components
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

// Declaration of component 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

// Exporting of component
export class NavbarComponent implements OnInit {

  // Declaration of variables
  user_id: any;
  auth_token: any;
  title: any;
  category: any;
  content: any;
  status: any;

  // form
  blogForm: any;

  // Component constructor
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  // Lifecycle function thats called when component is loaded
  ngOnInit(): void {

    // Build the form
    this.blogForm = this.formBuilder.group({
     title: [null, Validators.compose([Validators.required])],
     category: [null, Validators.compose([Validators.required])],
     status: [null, Validators.compose([Validators.required])],
     content: [null, Validators.compose([Validators.required])]
    });

    // Retreiving authentication details
    this.user_id = localStorage.getItem("user_id");
    this.auth_token = localStorage.getItem("TYUIO");

  }

  // Function that creates blog
  create_blog_post() {

    // Get data from input feilds
    /*this.title = document.getElementById("title").value;
    this.category = document.getElementById("category").value;
    this.status = document.getElementById("status").value;
    this.content = document.getElementById("content").value;
    */
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
      title: this.title,
      status: this.status,
      category: this.category,
      content: this.content
    };

    // API call to server to retreive blog posts
    this.http.post("http://localhost:3000/create_blog_post", postParams, httpOptions)
      .subscribe(data => {
        console.log(data);
        window.location.reload();
      })
  }

}
