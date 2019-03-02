
// import { Booking } from '../../booking/shared/booking.model';
// import { Injectable } from '@angular/core';
// import * as moment from 'moment';


// @Injectable()
// export class HelperService {
	
//  public getBookingDates(startDate, endDate ) {
//     const tempDates = [];
//     const mEndAt = moment(endDate);
//     let mStartAt = moment(startDate);

//     while(mStartAt < mEndAt) {
//       tempDates.push(mStartAt.format('YYYY-MM-DD'));
//       mStartAt = mStartAt.add(1, 'day');
//     }

//     tempDates.push(moment(startDate).format('YYYY-MM-DD'));
//     tempDates.push(mEndAt.format('YYYY-MM-DD'));

//     return tempDates;
//   }

  
   
// private formatDate(date ,'YYYY-MM-DD'){
//     return moment(date).format('YYYY-MM-DD');
//   }


//   public formatBookingDate(date){
//     return this.formatDate(date,'YYYY-MM-DD');
//   }

// }


import { Injectable } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import * as moment from 'moment';

@Injectable()
export class HelperService {

  public getRangeOfDates(startDate, endDate, dateFormat) {
    const tempDates = [];
    const mEndAt = moment(endDate);
    let mStartAt = moment(startDate);

    while(mStartAt < mEndAt) {
      tempDates.push(mStartAt.format(dateFormat));
      mStartAt = mStartAt.add(1, 'day');
    }

    tempDates.push(moment(startDate).format(dateFormat));
    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
  }

  private formatDate(date, dateFormat) {
    return moment(date).format(dateFormat);
  }

  public formatBookingDate(date) {
    return this.formatDate(date, Booking.DATE_FORMAT);
  }

  public getBookingRangeOfDates(startDate, endDate) {
    return this.getRangeOfDates(startDate, endDate, Booking.DATE_FORMAT);
  }
}