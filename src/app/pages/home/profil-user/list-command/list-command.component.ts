import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/@core/model/material/user.model'
import { GlobalService } from 'src/app/@core/services/global/global.service';

@Component({
  selector: 'app-list-command',
  templateUrl: './list-command.component.html',
  styleUrls: ['./list-command.component.scss']
})
export class ListCommandComponent implements OnInit {

  user$!: User;
  length!: number;

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.user.subscribe(
      user => {
        if(user) {
          this.user$ = user;
          console.log('New user => ', this.user$);
          
          this.length = this.user$.cart.length;
          console.log('USER => ', this.length);
        }
      }
    )
  }

  deleteInCart(id: string) {
    this.globalService.deleteToCart(id)
      .subscribe(
        data => {
          if(data.status) {
            this.user$ = data.data;
            console.log('New cart => ', this.user$.cart);
            this.length = this.user$.cart.length;
          }
        }
      )
  }

}
