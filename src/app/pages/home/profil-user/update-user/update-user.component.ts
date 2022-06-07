import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/@core/model/material/user.model';
import { GlobalService } from 'src/app/@core/services/global/global.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateForm!: FormGroup;
  user$!: User;

  constructor(private formBuilder: FormBuilder,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.user.subscribe(
      user => {
        if (user) {
          this.user$ = user
          this.initUpdateForm()
        }
      }
    )
  }

  initUpdateForm() {
    this.updateForm = this.formBuilder.group({
      nameFormController: [this.user$.name, Validators.required],
      usernameFormController: [this.user$.username, Validators.required],
      walletFormController: [this.user$.wallet, Validators.required],
      imageFormController: [this.user$.image, Validators.required]
    })
  }

  updateUser() {
    console.log('Updating...');
    const name = this.updateForm.get('nameFormController')?.value;
    const username = this.updateForm.get('usernameFormController')?.value;
    const wallet = this.updateForm.get('walletFormController')?.value
    this.globalService.onUpdateUser(name, username, wallet)
      .subscribe(
        data => {
          console.log('', data.data);
          
          this.globalService.user.next(data.data)
          console.log('New user ', this.user$)
        }
      )
  }

}
