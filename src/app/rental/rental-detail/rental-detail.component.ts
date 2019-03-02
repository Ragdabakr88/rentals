import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RentalService } from '../shared/rental.service';
import{AuthService} from '../../auth/shared/auth.service';

import { Rental } from '../shared/rental.model';
import { Booking } from '../../booking/shared/booking.model';
import { ReviewService} from '../../review/shared/review.service';
import { Review } from '../../review/shared/review.model';




@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

  rental: Rental;
  reviews: Review[] = [];
  rentalId: string;
  rating:number;
  
public serverUrl: string = 'http://localhost:3001'
  
  constructor(private route:ActivatedRoute ,private rentalService:RentalService,
   private auth:AuthService, private reviewService : ReviewService ) { }

  ngOnInit() {
  	this.route.params.subscribe(
      (params) =>{
      this.getRental(params['rentalId']);
      });
}
  

    getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental: Rental) => {
        this.rental = rental;
        console.log(this.rental);
        this.getReviews(rentalId);
        this.getOverallrating(rentalId);
      });
  }


    getOverallrating(rentalId: string) {
    this.reviewService.getOverallrating(rentalId).subscribe(
      (rating) => {
        debugger;
        this.rating = Math.round(rating * 10 ) / 10;
      });
  }


  getReviews(rentalId: string) {
    this.reviewService.getRentalReviews(rentalId).subscribe(
      ( reviews: Review[]) => {
debugger;
        this.reviews = reviews;
        debugger;
        console.log("reviews",this.reviews);
      },()=>{

      });
  }



}



