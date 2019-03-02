import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';// for can using ngFor
import { HttpClientModule } from '@angular/common/http'; // for using http request
import { Http } from '@angular/http';
import { NgPipesModule} from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';
import { CamelizePipe} from 'ngx-pipes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';//to send token to header
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';// use module from bootstrap
import { ToastModule } from 'ng2-toastr/ng2-toastr';//notification to user
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import {NgxPaginationModule} from 'ngx-pagination';

import {FilterPipe} from './common/pipes/filter.pipe';
import {FilterCatPipe} from './common/pipes/filtercat.pipe';
import {SortPipe} from './common/pipes/order.pipe';


//for route
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';

import { RentalComponent } from './rental/rental.component';
import { TempComponent } from './temp/temp.component';

import { RentalListComponent } from './rental/rental-list/rental-list.component';
import { RentalListItemComponent } from './rental/rental-list-item/rental-list-item.component';
import { RentalService } from './rental/shared/rental.service';
import { RentalDetailComponent } from './rental/rental-detail/rental-detail.component';

import { RentalBookingComponent } from './rental/rental-detail/rental-booking/rental-booking.component';
import { HelperService } from './common/service/helper.service';
import { BookingService } from './booking/shared/booking.service';

import { MapComponent } from './common/map/map.component';
import { MapService } from './common/map/map.service';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './auth/shared/auth.service';
import { AuthGuard} from './auth/shared/auth.guard';
import { TokenInterceptor} from './auth/shared/token.interceptor';

import { Daterangepicker } from 'ng2-daterangepicker';

import {  RentalSearchComponent  } from './rental/rental-search/rental-search.component';

import {  RentalCreateComponent  } from './rental/rental-create/rental-create.component';

import {  RentalUpdateComponent } from './rental/rental-update/rental-update.component';




import { ManageComponent } from './manage/manage.component';
import { ManageRentalComponent } from './manage/manage-rental/manage-rental.component';
import { ManageBookingsComponent } from './manage/manage-bookings/manage-bookings.component';
import { FormatDatePipe } from './common/pipes/format-date.pipe';
import { EditableInputComponent } from './common/components/editable/editable-input/editable-input.component';

import { PaymentComponent } from './payment/payment.component';
import { PaymentService } from './payment/shared/payment.service';

import { UserComponent } from './user/user.component';
import { UserService } from './user/shared/user.service';

import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ReviewComponent } from './review/review.component';
import { ReviewService  } from './review/shared/review.service';

import { ImageUploadComponent } from './common/components/image-upload/image-upload.component';
import { ImageUploadService } from './common/components/image-upload/shared/image-upload.service';
import { FootorComponent } from './common/footor/footor.component';


const routes:Routes = [
  {path:'', component:RentalComponent},
  {path:'temp', component:TempComponent},
  {path:'rentals',component:RentalListComponent},
  {path:'rentals/:rentalId',component:RentalDetailComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'rentals/:city/:bedrooms/:category/homes',component:RentalSearchComponent},
  {path:'new',component:RentalCreateComponent, canActivate:[AuthGuard] },
  {path:'manageRentals',component:ManageRentalComponent, canActivate:[AuthGuard] },
  {path:'manageBookings',component:ManageBookingsComponent, canActivate:[AuthGuard] },
  {path:'updateRental/:rentalId',component:RentalUpdateComponent, canActivate:[AuthGuard] },
  {path:'user/profile',component:UserDetailComponent, canActivate:[AuthGuard] }

  
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RentalComponent,
    TempComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    MapComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    RentalBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent,
    ManageComponent,
    ManageRentalComponent,
    ManageBookingsComponent,
    FormatDatePipe,
    RentalUpdateComponent,
    EditableInputComponent,
    PaymentComponent,
    UserComponent,
    UserDetailComponent,
    ReviewComponent,
    ImageUploadComponent,
    FootorComponent,
    FilterPipe,
    FilterCatPipe,
    SortPipe
  
  
  ],
  imports: [
    RouterModule.forRoot(routes),  // for route
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgPipesModule,
    FormsModule,
    ReactiveFormsModule,
    Daterangepicker,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    StarRatingModule.forRoot(),
    NgxPaginationModule,
    
   

    
    AgmCoreModule.forRoot({
       apiKey: 'AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM'
    })
  ],
  providers: [RentalService,MapService,CamelizePipe,AuthService,
  AuthGuard,HelperService,BookingService,
  PaymentService,UserService,ReviewService,ImageUploadService,
  {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},//send token to header

   ],

  bootstrap: [AppComponent]
})
export class AppModule { }
