// Importing of necessary components
import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { API_CONSTANTS } from '../../../services/constants';

// Declaration of component template
@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})

// Exporting of component
export class MainBannerComponent implements OnInit {

  // Declaration of variables
  account_info: any;
  email: any;
  user_id: any;
  auth_token: any;

  // form 
  registerForm: any;

  // Component constructor
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  // LifeCycle function that is called when component is loaded
  ngOnInit(): void { 

      // Build the form
      this.registerForm = this.formBuilder.group({
        email: [null, Validators.compose([Validators.required])]
       });

    this.user_id = localStorage.getItem('user_id');
  }

  // Function used generate user account with random auth code
  create_account() {
    //this.email = document.getElementById("email").value;

    this.email = this.registerForm.controls['email'].value;

    // API Headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // POST parameters for API call
    const postParams = {
      email: this.email,
    };

    // User account model
    interface user_account {
      status: string,
      message: string,
      user_info: {
        id: string,
        auth_token: string
      }
    }

    // API call to server to generate user account
    this.http.post<user_account>(API_CONSTANTS.BASE_URL_TEST + "/login", postParams, httpOptions)
      .subscribe(data => {
        this.account_info = data.user_info;
        this.user_id = data.user_info.id;
        localStorage.setItem('user_id', data.user_info.id);
        localStorage.setItem("TYUIO", data.user_info.auth_token);
        window.location.reload();
      })
  }

  // Function that logs user out
  logout() {
    localStorage.clear();
    window.location.reload();
  }

}
