import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/@core/guard/auth.guard';
import { HomeComponent } from './home.component';
import { DetailsComponent } from './list/details/details.component';
import { ListComponent } from './list/list.component';
import { ConsentComponent } from './profil-user/consent/consent.component';
import { IdentifiantsComponent } from './profil-user/identifiants/identifiants.component';
import { ListCommandComponent } from './profil-user/list-command/list-command.component';
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
    path: 'list',
    component: ListComponent
  },
  {
    path: 'list/details/:macID',
    // canActivate: [AuthGuard],
    component: DetailsComponent
  },
  {
    path: 'profil-user',
    canActivate: [AuthGuard],
    component: ProfilUserComponent,
    children: [
      {
        path: '',
        component: ListCommandComponent
      },
      {
        path: 'list',
        component: ListCommandComponent
      },
      {
        path: 'update-user',
        component: UpdateUserComponent
      },
      {
        path: 'consent',
        component: ConsentComponent
      },
      {
        path: 'identifiants',
        component: IdentifiantsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
