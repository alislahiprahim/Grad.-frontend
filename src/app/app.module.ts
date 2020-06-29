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
import { HomeComponent } from './home/home.component';
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
import { ModalModule, TooltipModule, PopoverModule, ChartsModule, CheckboxModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md'
import { MatDialogModule } from '@angular/material/dialog';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DiagnosisFormComponent } from './diagnosis-form/diagnosis-form.component';
import { SignupDocComponent } from './signup-doc/signup-doc.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { TreatmentPlanComponent } from './treatment-plan/treatment-plan.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthGuard } from './services/Auth.guard';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SpinnnerComponent } from './spinnner/spinnner.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import { TravelAgentSignUpComponent } from './travel-agent-sign-up/travel-agent-sign-up.component';


firebase.initializeApp(environment.firebaseConfig);

const routes: Routes = [
  { path: '', component: WelecomeComponent },
  { path: 'home/:location/:area', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Dregister', component: SignupDocComponent },
  { path: 'TravelAgent/SignUp', component: TravelAgentSignUpComponent },
  { path: 'Diagnosis/:id', component: DiagnosisFormComponent },
  { path: 'Dprofile/:id', component: DoctorProfileComponent },
  { path: 'dashboard/:id', component: DoctorDashboardComponent },
  { path: 'Pdashboard/:id', component: PatientProfileComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
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
    DoctorDashboardComponent,
    TreatmentPlanComponent,
    PatientProfileComponent,
    AdminDashboardComponent,
    UploadImgComponent,
    SpinnnerComponent,
    TravelAgentSignUpComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    ChartsModule,
    WavesModule,
    ButtonsModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    NgxPaginationModule,
    MatGridListModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    CheckboxModule,
    InputsModule,
    MatDatepickerModule,
    DragDropModule,
    IconsModule,
    CardsModule,
    ModalModule,
    TooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    PopoverModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
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
