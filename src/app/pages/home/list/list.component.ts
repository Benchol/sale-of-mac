import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from 'src/app/@core/services/data.service';
import { AuthService } from 'src/app/@core/services/authentification/auth.service';
import lottie from 'lottie-web';
import { faSearch, faUser, faCheck, faShoppingCart, faRegistered, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/@core/services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  @ViewChild('loading') loadingRef!: ElementRef;

  searchForm!: FormGroup;
  filterForm!: FormGroup;

  // For data to show
  dataList: any[] = [];
  isLoaded = false;
  dataPerPage: any[] = [];
  value = 1;

  connected!: boolean;
  added!: boolean;

  //Icons
  faSearch = faSearch;
  faUser = faUser;
  faCheck = faCheck;
  faShoppingCart = faShoppingCart;
  faRegistered = faRegistered;
  faUserCheck = faUserCheck;

  items!: MenuItem[];
  home!: MenuItem;

  // indexPaginator = 1;
  length = 0;
  pageSize = 10;
  // pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;

  //For Filter
  isCheck!: boolean;

  clicked_add = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private globalService: GlobalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  sleep(millsec: number): Promise<void> {
    return new Promise((resolve) => window.setTimeout(() => {
      resolve();
    }, millsec))
  }

  async changePage(event: any) {
    this.isLoaded = false;
    this.pageEvent = event;
    console.log(this.pageEvent.pageSize);
    console.log('IsLoaded => ', this.isLoaded);

    // await this.sleep(500);
    this.isLoaded = true;
    console.log('IsLoaded => ', this.isLoaded);

    if (this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize > this.pageEvent.length) {
      let page = this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize - this.pageEvent.length
      page = this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize - page;
      console.log('Index : ', this.pageEvent.pageIndex * this.pageEvent.pageSize + 1, ' - ', page);
      this.setDataCurrentPage(this.pageEvent.pageIndex * this.pageEvent.pageSize + 1, page);
      document.getElementById('head')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      console.log('Index : ', this.pageEvent.pageIndex * this.pageEvent.pageSize + 1, ' - ', this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize);
      this.setDataCurrentPage(this.pageEvent.pageIndex * this.pageEvent.pageSize + 1, this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize);
      document.getElementById('head')?.scrollIntoView({ behavior: 'smooth' })
    }
    // if (this.length - this.pageEvent.pageSize) 
  }

  setDataCurrentPage(begin: number, end: number) {
    this.dataPerPage = []
    for (let i = begin, j = 0; i < end; i++, j++) {
      // console.log('Set data current', this.dataList[i]);

      this.dataPerPage[j] = this.dataList[i]
    }
  }

  ngOnInit(): void {
    this.globalService.refreshStatus = true
    this.initFilter()
    this.initSearchForm()
    this.authService.connected.subscribe(
      status => {
        this.connected = status;
        console.log('Status =>', this.connected);

      }
    )
    this.items = [
      {
        label: 'Ordinateur',
        routerLink: '/home/list'
      },
      {
        label: 'Laptop',
        routerLink: '/home/list'
      },
      {
        label: 'Macbook',
        routerLink: '/list'
      }
    ]
    this.home = {
      label: 'home',
      routerLink: 'home'
    }
    this.isLoaded = false;
    this.dataService.getAllMaterials().subscribe(
      data => {
        if (data) {
          console.log('list ss   => ', data);

          if (data.status) {
            console.log(data.message);
            if (data.user) {
              this.globalService.user.next(data.user)
              console.log('Status connected: ', data.user.isConnected);
              this.authService.connected.next(data.user.isConnected)
            } else {
              this.router.navigate(['/auth/login'])
            }
            this.dataList = data.data;
            this.isLoaded = true;
            console.log(this.dataList);
            this.length = this.dataList.length;
            this.setDataCurrentPage(1, this.pageSize);
          } else {
            this.isLoaded = false;
          }
        }
      }
    )
    console.log('Status connected : ', this.authService.connected);
  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      keyWord: ['', Validators.required]
    })
  }

  initFilter() {
    this.filterForm = this.formBuilder.group({
      proc_type_M1_pro: [false, Validators.required],
      proc_type_M1: [false, Validators.required],
      proc_type_i7: [false, Validators.required],
      proc_type_i5: [false, Validators.required],
      ecran_16: [false, Validators.required],
      ecran_14: [false, Validators.required],
      ecran_13: [false, Validators.required],
      ram_16: [false, Validators.required],
      ram_8: [false, Validators.required],
      ram_4: [false, Validators.required],
      dur_1_To_ssd: [false, Validators.required],
      dur_512_Go_ssd: [false, Validators.required],
      dur_256_Go_ssd: [false, Validators.required],
      dur_500_Go: [false, Validators.required],
      dur_256_Go: [false, Validators.required],
      dur_320_Go: [false, Validators.required],

    })
  }

  onChange() {
    const proc1 = this.filterForm.get('proc_type_M1_pro')?.value
    const proc2 = this.filterForm.get('proc_type_M1')?.value
    const proc3 = this.filterForm.get('proc_type_i7')?.value
    const ecran1 = this.filterForm.get('ecran_16')?.value
    const ecran2 = this.filterForm.get('ecran_14')?.value
    const ecran3 = this.filterForm.get('ecran_13')?.value
    const ram1 = this.filterForm.get('ram_16')?.value
    const ram2 = this.filterForm.get('ram_8')?.value
    const ram3 = this.filterForm.get('ram_4')?.value
    const dur1 = this.filterForm.get('dur_1_To_ssd')?.value
    const dur2 = this.filterForm.get('dur_512_Go_ssd')?.value
    const dur3 = this.filterForm.get('dur_256_Go_ssd')?.value
    const dur4 = this.filterForm.get('dur_500_Go')?.value
    const dur5 = this.filterForm.get('dur_320_Go')?.value
    const dur6 = this.filterForm.get('dur_256_Go')?.value


  }

  search() {
    const keyWord = this.searchForm.get('keyWord')?.value;
    this.isLoaded = false;
    this.dataList = [];
    this.dataService.searchMaterial(keyWord)
      .subscribe((data: any) => {
        if (data.status) {
          console.log(data.data);
          this.dataList = data.data
          this.length = this.dataList.length;
          console.log('Index current =>', this.pageEvent.pageIndex);
          this.pageSize = 10;
          if (this.length < this.pageSize) {
            this.pageSize = this.length;
            this.setDataCurrentPage(0, this.pageSize)
          } else {
            this.setDataCurrentPage(0, this.pageSize);
          }
          // this.changePage(this.pageEvent)
          this.isLoaded = true;
        }
      })
  }

  async addToCart(index: number, id: any) {
    // console.log(typeof(id));
    let selector = index.toString()
    let icon = document.getElementById(selector);
    if (this.connected) {
      // if (icon) {
      //   console.log(icon.children[0]);
      //   // icon.innerHTML = `<mat-progress-spinner color="accent" diameter="20" class="text-sm" mode="indeterminate"></mat-progress-spinner>`
      // }
      this.globalService.addToCart(id)
        .subscribe(
          async (data) => {
            if (icon) {
              icon.children[0].innerHTML = `<mat-icon class="pr-1.5 h-auto text-xl">done_all</mat-icon>`;
              icon.children[1].innerHTML = `<span class="pl-0.5">Ajouté</span>`;
              await this.sleep(2000);
              icon.children[0].innerHTML = `<mat-icon class="pr-1.5 h-auto text-xl">add_shopping_cart</mat-icon>`;
              icon.children[1].innerHTML = `<span class="pl-2.5">Ajouter au panier</span>`;
            }
            this.globalService.user.next(data.data)
          }
        )
    } else {
      this.router.navigate(['/auth/login'])
    }
  }

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.loadingRef.nativeElement, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/loader.json' // the path to the animation json
    });
  }

}
