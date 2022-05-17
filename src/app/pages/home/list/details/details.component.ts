import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/@core/services/data.service';
import { faSearch, faUser, faCheck, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import lottie from 'lottie-web';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('loading') loadingRef!: ElementRef;

  id!: string | null;
  currentMaterial: any;
  isLoaded = false;
  reducedPrice!: number;
  val = 3;
  reference!: string | undefined;

  faSearch = faSearch;
  faUser = faUser;
  faCheck = faCheck;
  faShoppingCart = faShoppingCart;

  items!: MenuItem[];
  home!: MenuItem;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('macID');
        console.log(this.id);
        this.dataService.getMaterialById(this.id).subscribe(
          data => {
            if (data.status) {
              console.log(data.message);
              this.currentMaterial = data.data;
              let price = parseFloat(this.currentMaterial.price.toString().replace('€', ''))
              this.reducedPrice = price - (price * 0.08);
              console.log();
              this.reference = this.id?.substring(0, this.id?.indexOf('d'));
              this.isLoaded = true;

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
                  routerLink: '/home/list'
                },
                {
                  label: this.currentMaterial.title,
                  routerLink: `/home/list/details/${this.id}`
                }
              ]
              this.home = {
                label: 'home',
                routerLink: '/home/list'
              }
            }
          }
        )
      }
    )
  }

  ngAfterViewInit(): void {
    lottie.loadAnimation({
      container: this.loadingRef.nativeElement, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/loading.json' // the path to the animation json
    });
  }

}
