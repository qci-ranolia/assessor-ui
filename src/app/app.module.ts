import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { FormsComponent } from './home/forms/forms.component';
import { LoginComponent } from './login/login.component';
import { FormListingComponent } from './home/form-listing/form-listing.component';
import { GraphComponent } from './home/graph/graph.component';
import { ProjectService } from './service/ProjectService';
import { APIService } from './service/APIService';
import { FormBuilderComponent } from './home/forms/form-builder/form-builder.component';
import { InputTextComponent } from './home/forms/form-builder/input-text/input-text.component';
import { InputPasswordComponent } from './home/forms/form-builder/input-password/input-password.component';
import { InputEmailComponent } from './home/forms/form-builder/input-email/input-email.component';
import { InputBreakComponent } from './home/forms/form-builder/input-break/input-break.component';
import { InputCheckboxComponent } from './home/forms/form-builder/input-checkbox/input-checkbox.component';
import { InputDateComponent } from './home/forms/form-builder/input-date/input-date.component';
import { InputDropdownComponent } from './home/forms/form-builder/input-dropdown/input-dropdown.component';
import { InputFileComponent } from './home/forms/form-builder/input-file/input-file.component';
import { InputNumberComponent } from './home/forms/form-builder/input-number/input-number.component';
import { InputPhoneComponent } from './home/forms/form-builder/input-phone/input-phone.component';
import { InputRadioComponent } from './home/forms/form-builder/input-radio/input-radio.component';
import { InputSliderComponent } from './home/forms/form-builder/input-slider/input-slider.component';
import { InputTextareaComponent } from './home/forms/form-builder/input-textarea/input-textarea.component';
import { InputTimeComponent } from './home/forms/form-builder/input-time/input-time.component';
import { TemplatesComponent } from './home/templates/templates.component';
import { InputCameraComponent } from './home/forms/form-builder/input-camera/input-camera.component';
import { InputVideoComponent } from './home/forms/form-builder/input-video/input-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    FormsComponent,
    LoginComponent,
    FormListingComponent,
    GraphComponent,
    FormBuilderComponent,
    InputTextComponent,
    InputPasswordComponent,
    InputEmailComponent,
    InputBreakComponent,
    InputCheckboxComponent,
    InputDateComponent,
    InputDropdownComponent,
    InputFileComponent,
    InputNumberComponent,
    InputPhoneComponent,
    InputRadioComponent,
    InputSliderComponent,
    InputTextareaComponent,
    InputTimeComponent,
    TemplatesComponent,
    InputCameraComponent,
    InputVideoComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    ProjectService,
    APIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
