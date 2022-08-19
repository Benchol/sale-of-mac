import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/@core/guard/auth.guard';
import { RefreshGuard } from 'src/app/@core/guard/refresh.guard';
import { HomeComponent } from './home.component';
import { DetailsComponent } from './list/details/details.component';
import { ListComponent } from './list/list.component';
import { ConsentComponent } from './profil-user/consent/consent.component';
import { IdentifiantsComponent } from './profil-user/identifiants/identifiants.component';
import { ListCommandComponent } from './profil-user/list-command/list-command.component';
import { PaymentComponent } from './profil-user/payment/payment.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { UpdateUserComponent } from './profil-user/update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
    // component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'list/details/:macID',
        component: DetailsComponent
      },
      {
        path: 'profil-user',
        canActivate: [RefreshGuard],
        component: ProfilUserComponent,
        children: [
          {
            path: '',
            component: ListCommandComponent
          },
          {
            path: 'list',
            canActivate: [RefreshGuard],
            component: ListCommandComponent
          },
          {
            path: 'update-user',
            canActivate: [RefreshGuard],
            component: UpdateUserComponent
          },
          {
            path: 'consent',
            canActivate: [RefreshGuard],
            component: ConsentComponent
          },
          {
            path: 'identifiants',
            canActivate: [RefreshGuard],
            component: IdentifiantsComponent
          },
          {
            path: 'payment',
            canActivate: [RefreshGuard],
            component: PaymentComponent
          }
        ]
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
