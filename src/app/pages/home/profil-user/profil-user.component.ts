import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSearch, faUser, faCheck, faShoppingCart, faRegistered, faUserCheck, faClose, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/@core/model/material/user.model';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/@core/services/authentification/auth.service';
import { GlobalService } from 'src/app/@core/services/global/global.service';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})
export class ProfilUserComponent implements OnInit {
  
  searchForm!: FormGroup;

  connected$!: boolean;
  user$!: User;

  //Icons
  faSearch = faSearch;
  faUser = faUser;
  faCheck = faCheck;
  faShoppingCart = faShoppingCart;
  faRegistered = faRegistered;
  faUserCheck = faUserCheck;
  faClose = faClose;
  faDeleteLeft = faDeleteLeft;

  items!: MenuItem[];
  home!: MenuItem;

  length = 0;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private globalService: GlobalService
    ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Espace client',
        routerLink: '/home/profil-user'
      },
    ]
    this.home = {
      label: 'home',
      routerLink: '/home/list'
    }
    this.initSearchForm();

    this.globalService.user.subscribe(
      user => {
        if(user) {
          this.user$ = user;
          console.log('New user => ', this.user$);
          console.log('Cart ', typeof(this.user$.cart));
          
          this.length = this.user$.cart.length;
          console.log('USER => ', this.length);
        }
      }
    )

    this.authService.connected.subscribe(
      status => {
        this.connected$ = status;
        console.log('Status connected => ', this.connected$);
        
      }
    )
  }

  toCart() {
    document.getElementById('list_cart')?.scrollIntoView({behavior: 'smooth'})
  }

  toProfil() {
    document.getElementById('profil')?.scrollIntoView({behavior: 'smooth'})
  }

  

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      keyWord: ['', Validators.required]
    })
  }

}
