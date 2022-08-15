import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global/global.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanActivate {

  constructor( 
      private globalService: GlobalService,
      private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.globalService.refreshStatus) {
      return true;
    } else {
      this.router.navigate(['/home/list'])
      return false
    }
  }
  
}
