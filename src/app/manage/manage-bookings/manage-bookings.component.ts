import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import { BookingService } from '../../booking/shared/booking.service';
import { FormatDatePipe } from '../../common/pipes/format-date.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { Rental } from '../../rental/shared/rental.model';
import { PaymentService } from '../../payment/shared/payment.service';
import { Review } from '../../review/shared/review.model';

import * as moment from 'moment';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {

bookings:Booking[] = [];
payments: any[];

rental:Rental;
review:Review;
paymentId:string;

  constructor(private bookingService : BookingService,
              private paymentService  : PaymentService
    ) { }

  ngOnInit() {
    
  	this.bookingService.getUserBookings().subscribe(
  		(bookings:Booking[])=>{
          this.bookings = bookings;
  		},
  		() => {
  		

  		})
    this.getPendingPayments();
    }


    getPendingPayments(){
      debugger;
      this.paymentService.getPendingPayments().subscribe(
        (payments:any)=>{
         this.payments = payments;
        },
        ()=>{

        })
    }


      declinePayment(payment){
      console.log("decline");
      this.paymentService.declinePayment(payment).subscribe(
        (json)=>{
        payment.status = 'declined';
        },
        err =>{

      });
    }

      acceptPayment(payment,paymentId){
      this.paymentService.acceptPayment(payment,paymentId).subscribe(
   
        (json)=>{
          debugger;
        payment.status = 'paid';
        debugger;
        },
        err =>{

      });
    }

reviewPublished(bookingIndex:number,review:Review){
  console.log("review");
  debugger;
this.bookings[bookingIndex]['review'] = review;

}

}
