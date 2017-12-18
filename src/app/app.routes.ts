import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormListingComponent } from './home/form-listing/form-listing.component';
import { FormsComponent } from './home/forms/forms.component';
import { TemplatesComponent } from './home/templates/templates.component';

export const routes: Routes = [
  { path: '', component: FormListingComponent},
  { path: 'form', component: FormsComponent},
  { path: 'template', component: TemplatesComponent},
//   { path: 'forms', component:  FormComponent},
//   { path: 'formBuilder', component:  FormBuilderComponent},
//   { path: 'dash', component:  DashboardComponent, children: [
//     { path: '', component: ProjectComponent},
//     { path: 'form', component: FormComponent},
//     { path: 'formBuilder', component:  FormBuilderComponent},
//     { path: 'response', component: ResponseComponent},
//     { path: 'org', component: OrganisationComponent},
//   ]}

];
