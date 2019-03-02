

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental} from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService {

  constructor(private http: HttpClient) {}



  public getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals/allRentals');
  }

    public getRentalById(rentalId:string): Observable<any> {
    return this.http.get('/api/v1/rentals/' +rentalId);
  }

   public createRental(rental:Rental): Observable<any> {
    return this.http.post('/api/v1/rentals/createRental' , rental);
  }

  public getUserRentals():Observable <any>{
  	 return this.http.get('/api/v1/rentals/manage');
  }


 public updateRental(rentalId: string, rentalData: any): Observable<any> {
    return this.http.patch(`/api/v1/rentals/update/${rentalId}`,rentalData);
  }

  //  public getRentalsByCity(city: string): Observable<any> {
  //   return this.http.get(`/api/v1/rentals?city=${city}`);
  // }

   public getRentalsByCity(city: string,bedrooms:number,category:string): Observable<any> {
    return this.http.get(`/api/v1/rentals?city=${city}&bedrooms=${bedrooms}&category=${category}`);
   }

  


   public deleteRental(rentalId: string): Observable<any> {
    return this.http.delete(`/api/v1/rentals/delete/${rentalId}`);
  }


 


}

	


    


