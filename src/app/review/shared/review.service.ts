import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../../rental/shared/rental.model';
import { Booking } from '../../booking/shared/booking.model';
import { Review } from './Review.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient) {}

   public createReview(review:Review ,bookingId:string): Observable<any> {
    return this.http.post(`/api/v1/review/${bookingId}`,review);
  }

  public getRentalReviews(rentalId:string): Observable<any> {
    return this.http.get(`/api/v1/review/${rentalId}`);
  }



  public getOverallrating(rentalId:string): Observable<any> {
    return this.http.get(`/api/v1/review/${rentalId}/rating`);
  }





}
