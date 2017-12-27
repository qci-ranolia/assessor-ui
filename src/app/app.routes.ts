import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FormListingComponent } from './home/form-listing/form-listing.component';
import { FormsComponent } from './home/forms/forms.component';
import { LoginComponent } from './login/login.component';
import { TemplatesComponent } from './home/templates/templates.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: FormListingComponent},
  { path: 'formListing', component: FormListingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'form', component: FormsComponent},
  { path: 'template', component: TemplatesComponent},
  { path: 'dash', component:  DashboardComponent, children: [
    { path: '', component: FormListingComponent},
    { path: 'formListing', component: FormListingComponent},
    { path: 'form', component: FormsComponent},
    { path: 'template', component: TemplatesComponent},
  ]}

];
