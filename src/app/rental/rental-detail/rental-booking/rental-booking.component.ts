import { Component, OnInit, Input , ViewChild, ViewEncapsulation ,ViewContainerRef} from '@angular/core';
import { Rental} from '../../shared/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../../booking/shared/booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';



@Component({
  selector: 'app-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.css']
})
export class RentalBookingComponent implements OnInit {

  
	@Input() rental:Rental;
  @Input() bookings:Booking[];
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;
 

  newBooking:Booking;
  modelRef:any;
  errors:any[] = [];
	daterange: any = {};
  bookedOutDates:any[] = [];

      options: any = {
         locale: { format: Booking.DATE_FORMAT },
        alwaysShowCalendars: false,
        opens:'left',
        autoUpdateInput:false,
        isInvalidDate: this.checkForInvalidDates.bind(this)
    };



  constructor(private helper:HelperService,
    private toastr: ToastsManager ,
    private modalService: NgbModal ,
    private vcr: ViewContainerRef,
    private bookingService:BookingService
    

    ) { 
     this.toastr.setRootViewContainerRef(vcr)
  }

  ngOnInit() {
    this.newBooking = new Booking();
    console.log(this.newBooking);
    this.getBookedOutDates();
 }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }



  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
   if (this.bookings && this.bookings.length > 0) {
        this.bookings.forEach((booking: Booking) => {
          const dateRange = this.helper.getBookingRangeOfDates(booking.startDate,booking.endDate);
          this.bookedOutDates.push(...dateRange);
          console.log(this.bookedOutDates);
        });
     }
   }

close(content){
  this.modelRef.close();
}

openConfirmModel(content){
  this.errors = [];
    // console.log("New",this.newBooking);
   this.modelRef = this.modalService.open(content);
   this.picker.datePicker;
  }

private addNewBookedOutDates(bookingData){
   const dateRange = this.helper.getBookingRangeOfDates(bookingData.startDate, bookingData.endDate);
  this.bookedOutDates.push(...bookingData);
}


   onPaymentConfirmed(token :any) {
    this.newBooking.token = token;
    // console.log(this.newBooking.token);
  }

createBooking(){
    this.newBooking.rental = this.rental;

  this.bookingService.createBooking(this.newBooking).subscribe(
    (bookingData:any)=>{
      debugger;
     this.addNewBookedOutDates(bookingData);
     this.newBooking = new Booking();
     this.modelRef.close();
     this.resetDatePicker();
    this.toastr.success('Booking has been successfuly created check it in your manger section!', 'Success!');
    },
     (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      })
}

   selectedDate(value: any, datepicker?: any) {
        this.options.autoUpdateInput = true;
        this.newBooking.startDate = this.helper.formatBookingDate(value.start);
        this.newBooking.endDate = this.helper.formatBookingDate(value.end);
        this.newBooking.days = -(value.start.diff(value.end,'days'));
        this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
    }

}
