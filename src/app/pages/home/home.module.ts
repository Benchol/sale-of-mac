import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { materialModule } from 'src/app/@shared/material.UI/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DetailsComponent } from './list/details/details.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { UpdateUserComponent } from './profil-user/update-user/update-user.component';
import { ListCommandComponent } from './profil-user/list-command/list-command.component';
import { ConsentComponent } from './profil-user/consent/consent.component';
import { IdentifiantsComponent } from './profil-user/identifiants/identifiants.component';
import { FooterComponent } from 'src/app/pages/home/shared/footer/footer.component';
import { PaymentComponent } from './profil-user/payment/payment.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    DetailsComponent,
    ProfilUserComponent,
    UpdateUserComponent,
    ListCommandComponent,
    ConsentComponent,
    IdentifiantsComponent,
    FooterComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BreadcrumbModule,
    RatingModule,
    AgGridModule,
    ...materialModule
  ]
})
export class HomeModule { }
