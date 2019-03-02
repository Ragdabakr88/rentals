import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Rental} from './shared/rental.model';
import {RentalService} from './shared/rental.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

rentals: Rental[] = [];

  constructor(private router: Router ,private rentalService: RentalService) { }

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


// search(city:string,bedrooms:string){
// 	this.router.navigate([`/rentals/${city}/homes`]);
//     }
// }



search(city:string,bedrooms:number,category:string){
	this.router.navigate([`/rentals/${city}/${bedrooms}/${category}/homes`]);
    }
}
