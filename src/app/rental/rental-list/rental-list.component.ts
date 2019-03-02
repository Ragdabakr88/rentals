import { Component, OnInit } from '@angular/core';
import {RentalService} from '../shared/rental.service';
import {Rental} from '../shared/rental.model';



@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']




})
export class RentalListComponent implements OnInit {


 rentals: Rental[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    const rentalObservable = this.rentalService.getRentals();

    rentalObservable.subscribe(
    	(rentals: Rental[]) => {
        debugger;
    		this.rentals = rentals;
        console.log(rentals);
    	},
    	(err) => {
    	},
    	() => {
    	});
 } 

sort(){
  this.rentals.sort(function(a, b) {
    console.log("clicked");
    var textA = a.dailyRate;
    var textB = b.dailyRate;
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
}

sortReverse(){
  this.rentals.sort(function(a, b) {
    console.log("clickedr");
    var textA = a.dailyRate;
    var textB = b.dailyRate;

   return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
 });

 }

// sortReviews(){
//     this.rentals.sort(function(a, b) {
//     console.log("clickedr");
//     var textA = a.review;
//     var textB = b.review;

//    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
//  });
// } 

}





