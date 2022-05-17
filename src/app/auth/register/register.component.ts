import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@core/services/authentification/auth.service';
import { DataService } from 'src/app/@core/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      nameFormControl: ['', Validators.required],
      usernameFormControl: ['', Validators.required],
      emailFormControl: ['', [Validators.email, Validators.email]],
      passwordFormControl: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  register() {
    const name = this.registerForm.get('nameFormControl')?.value;
    const username = this.registerForm.get('usernameFormControl')?.value;
    const email = this.registerForm.get('emailFormControl')?.value;
    const password = this.registerForm.get('passwordFormControl')?.value;
    this.authService.onRegister(name, username, email, password)
      .subscribe((data: any) => {
          if(data.status) {
            alert('Registered ')
          }
      })
  }

}
