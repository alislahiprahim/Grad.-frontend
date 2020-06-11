import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { WelecomeComponent } from './welecome/welecome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component'
import { MatButtonModule } from '@angular/material/button';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { tokenInterceptor } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';
import { DoctorService } from './services/doctor.service';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationsService } from './services/notifications.service';
import { MatSelectModule } from '@angular/material/select';
import { ModalModule, TooltipModule, PopoverModule, CheckboxModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md'
import { MatDialogModule } from '@angular/material/dialog';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DiagnosisFormComponent } from './diagnosis-form/diagnosis-form.component';
import { SignupDocComponent } from './signup-doc/signup-doc.component';
import { MatStepperModule } from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: WelecomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Dregister', component: SignupDocComponent },
  { path: 'Diagnosis', component: DiagnosisFormComponent },
  { path: 'Dprofile/:id', component: DoctorProfileComponent },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    DoctorProfileComponent,
    WelecomeComponent,
    SearchBarComponent,
    DiagnosisFormComponent,
    SignupDocComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    NgxPaginationModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatMenuModule,
    CheckboxModule,
    InputsModule,
    IconsModule,
    CardsModule,
    ModalModule,
    TooltipModule,
    MatStepperModule,
    PopoverModule,
    NgbModule,
  ],


  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  providers: [AuthService, NotificationsService, DoctorService, {
    provide: HTTP_INTERCEPTORS,
    useClass: tokenInterceptor,
    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
