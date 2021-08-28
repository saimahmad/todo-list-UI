import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginMode: boolean = true;
  loginForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required)
    })
  }

  changeMode() {
   // this.loginMode = !this.loginMode;
   if(this.loginMode) {
     this.loginForm.get('name').setValidators([Validators.required]);
     this.loginForm.get('name').updateValueAndValidity();
     this.loginForm.get('confirmPassword').setValidators([Validators.required]);
     this.loginForm.get('confirmPassword').updateValueAndValidity();
   }
   else {
    this.loginForm.get('name').clearValidators()
     this.loginForm.get('name').updateValueAndValidity();
     this.loginForm.get('confirmPassword').clearValidators()
     this.loginForm.get('confirmPassword').updateValueAndValidity();
   }
   this.loginMode = !this.loginMode
  }

  showConfirmPasswordError() {
    return this.loginForm.get('password').value != this.loginForm.get('confirmPassword').value && this.loginForm.get('confirmPassword').dirty
  }

  onSubmit() {
    
  }

}
