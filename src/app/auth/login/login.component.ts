import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//name of login
 loginForm:FormGroup;
errors:any[] =[];
 notifyMessage:string="";

  constructor(private auth:AuthService,
               private router: Router,
               private fb:FormBuilder,
               private route:ActivatedRoute // 

               ) { }

  ngOnInit() {
  	this.createForm();

    //displaying errors
  	this.route.params.subscribe((params) => {
  		if(params['registered'] === 'success'){
         this.notifyMessage = "You have been successfuly registered,you can login now !";
  		}
  	 });
  	
  }

  createForm(){
  	this.loginForm = this.fb.group({
  		 email: ['', [Validators.required,
                   Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
        	})
  }


  login(){
  	this.auth.login(this.loginForm.value).subscribe(
     (token) => {
        this.router.navigate(['/rentals']);

     },
     (errorResponse) => {
        this.errors = errorResponse.error.errors;
     });
  		
  	//console.log(this.loginForm.value);
  }

}
