import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
      private globalService: GlobalService,
      private router: Router,
      private _snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {
    console.log('Local storage: ', localStorage.getItem('token'));
    console.log('Payment storage: ', localStorage.getItem('payment'))
    if(localStorage.getItem('payment')) {
      let id = localStorage.getItem('payment');
      console.log('Payment exist...');
      
      this.globalService.getPayment(id).subscribe(
        (result: any) => {
          if(result.status) {
            console.log('STATUS => ', result.payment.status);
            if(result.payment.status == 'paid') {
              console.log('Payment success... and draw monney in wallet of the user')
            } else {
              console.log('Payment not paid...')
            }
          } else {
            console.log("Error payment => ", result);
          }
          localStorage.removeItem('payment')
        }
      )
    }
    
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

  createPayment(idUser: string, idProduct: string) {
      this.globalService.createPayment(idUser, idProduct).subscribe(
        (data: any) => {
          alert(data.payment.status)
          if(data.status) {
            console.log('Payment successment : ', data.payment.amount.value);
            this._snackbar.open('Payment success', 'ok', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              duration: 6000,
            })
            // alert('fef')
            localStorage.setItem('payment', data.payment.id);
            // this.router.navigateByUrl(data.payment._links.checkout.href)
            window.location.href = data.payment._links.checkout.href
          } else {
            console.log('Found insufficient...');
            this._snackbar.open('Found insufficient...', 'ok', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              duration: 6000,
            })
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
