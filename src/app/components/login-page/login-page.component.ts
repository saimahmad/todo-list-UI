import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginMode: boolean = true;
  loginForm: FormGroup;
  constructor(private loginService: LoginService,private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if(this.loginService.getAuthToken()) {
      this.navigateToList()
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  //to switch between login and signup mode
  changeMode() {
    if (this.loginMode) {
      this.loginForm.get('name').setValidators([Validators.required]);
      this.loginForm.get('name').updateValueAndValidity();
      this.loginForm
        .get('confirmPassword')
        .setValidators([Validators.required]);
      this.loginForm.get('confirmPassword').updateValueAndValidity();
    } else {
      this.loginForm.get('name').clearValidators();
      this.loginForm.get('name').updateValueAndValidity();
      this.loginForm.get('confirmPassword').clearValidators();
      this.loginForm.get('confirmPassword').updateValueAndValidity();
    }
    this.loginMode = !this.loginMode;
  }

  //to show error in case of confirmation password and password does not matches
  showConfirmPasswordError() {
    return (
      this.loginForm.get('password').value !=
        this.loginForm.get('confirmPassword').value &&
      this.loginForm.get('confirmPassword').dirty
    );
  }

  navigateToList() {
    this.router.navigate(['todo-list'])
  }

  onSubmit() {
    let payload:any = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    if (this.loginMode) {
      this.loginService.login(payload).subscribe((data:any) => {
        this.loginService.setAuthToken(data.token)
        this.loginService.name = data.user.name
        this.navigateToList()
      },(error) => {
        this.handleError(error.error)
      });
    }
    else {
      payload.name = this.loginForm.get('name').value;
      this.loginService.signUp(payload).subscribe((data:any) => {
        this.loginService.setAuthToken(data.token)
        this.navigateToList()
      },(error) => {
        this.handleError(error.error)
      })
    }
  }

  handleError(error:string) {
    let msg:string = ''
    if(error == 'unable to login') {
      msg = "Invalid Credentials!"
    }
    else if(error.includes("Email is invalid")) {
      msg = "Invalid Email!"
    }
    else if(error.includes("duplicate key")) {
      msg = "Email already exist!"
    }
    else{
      msg = error;
    }
    this.openErrorSnackbar(msg)
  }
    //to show error popup
    openErrorSnackbar(error: string) {
      this.snackBar.open(error, '', {
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["red-snackbar"]
      });
    }
}
