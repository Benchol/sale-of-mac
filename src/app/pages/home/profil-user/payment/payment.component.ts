import { Component, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef, ColGroupDef } from 'ag-grid-community';
import { GlobalService } from 'src/app/@core/services/global/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare function Mollie(profilId: string, options: any): any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentList!: any[];
  mollie: any;

  public autoGroupColumnDef: ColDef = {
    minWidth: 100,
    maxWidth: 500
  };

  columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Client',
      children: [
        {
          headerName: 'Name',
          field: 'metadata.name',
          rowDrag: true,
        },
        {
          headerName: 'Email',
          field: 'metadata.email'
        },
      ]
    },
    {
      headerName: 'Payment',
      // rowGroup: true,
      children: [
        {
          headerName: 'Amount',
          field: 'amount.value',
          columnGroupShow: 'opened'
        },
        {
          field: 'status',
          columnGroupShow: 'opened'
        },
        {
          field: 'description',
          minWidth: 400,
          // hide: true,
          columnGroupShow: 'closed'
        },

        {
          field: 'method',
          // hide: true,
          columnGroupShow: 'closed'
        },
        {
          field: 'createdAt',
          minWidth: 200,
          // hide: true,
          columnGroupShow: 'closed'
        }
      ]
    }
  ]
  defaultColDef: ColDef = {
    resizable: true
  }

  constructor(private globalService: GlobalService, private http: HttpClient) { }

  ngOnInit(): void {
    // console.log('En attente');
    // this.initMollieComponent()
    this.globalService.listPayment().subscribe(
      data => {
        console.log('Data : ', data);

        this.paymentList = data.paymentList

        console.log('payment : ', this.paymentList);

      }
    )
  }

  onCellClicked(event: CellClickedEvent) {
    console.log(event);
  }

  initMollieComponent() {
    // this.mollie = fetch("https://js.mollie.com/v1/mollie.js")
    // this.mollie.then((data: any) => {
    //   console.log('data :', data); 
    // })
    // this.mollie = Mollie('pfl_HMkeFojTvM', {
    //   testmode: true
    // })

    // console.log('Mollllie ', this.mollie);

    // var cardNumber = this.mollie.createComponent('cardNumber');
    // cardNumber.mount('#card-number');

    // var cardHolder = this.mollie.createComponent('cardHolder');
    // cardHolder.mount('#card-holder');

    // var expiryDate = this.mollie.createComponent('expiryDate');
    // expiryDate.mount('#expiry-date');

    // var verificationCode = this.mollie.createComponent('verificationCode');
    // verificationCode.mount('#verification-code');

    // console.log('Verfication : ', verificationCode);

    // let form = document.querySelector('form');
    // form?.addEventListener('submit', async e => {
    //   e.preventDefault();

    //   const { token, error } = await this.mollie.createToken();

    //   if (error) {
    //     // Something wrong happened while creating the token. Handle this situation gracefully.
    //     return;
    //   }

    //   // Add token to the form
    //   const tokenInput = document.createElement('input');
    //   tokenInput.setAttribute('type', 'hidden');
    //   tokenInput.setAttribute('name', 'cardToken');
    //   tokenInput.setAttribute('value', token);

    //   form?.appendChild(tokenInput);

    //   // Submit form to the server
    //   form?.submit();
    // });
  }

}
