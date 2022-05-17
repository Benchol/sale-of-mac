import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initUpdateForm()
  }

  initUpdateForm() {
    
  }

}
