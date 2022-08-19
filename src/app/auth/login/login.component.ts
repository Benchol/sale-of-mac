import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/authentification/auth.service';
import { GlobalService } from 'src/app/@core/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  error!: boolean;
  errorMessage!: string;


  constructor(private formBuilder: FormBuilder,
      private authService: AuthService, 
      private globalService: GlobalService,
      private router:  Router
      ) {
        this.error = false;
       }

  ngOnInit(): void {
    this.initForm()
    this.authService.error.subscribe((error: any) => {
      if(error) {
        this.error = error.status
        this.errorMessage = error.message
      }
      console.log('staty : ', this.error);
      
    })
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      usernameFormControl: ['Benchol',  Validators.required],
      passwordFormControl: ['123456', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    })
    // this.authService.error.subscribe(
    //   (err: any) => {
    //     this.error = err
    //   }
    // )
  }

  login() {
    const username = this.loginForm.get('usernameFormControl')?.value;
    const password = this.loginForm.get('passwordFormControl')?.value;

    this.authService.onLogin(username, password)
      .subscribe(
        data => {
          if(data.status) {
            this.globalService.user.next(data.data)
            console.log(this.globalService.user);
            console.log('TokEN', data.token);
            
            localStorage.setItem('token', data.token)
            this.authService.connected.next(true)            
            this.router.navigate(['/home/list'])
          }
        }
      )
  }

}
