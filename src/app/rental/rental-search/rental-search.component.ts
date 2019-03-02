import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.css']
})
export class RentalSearchComponent implements OnInit {

bedrooms:number;
city:string;
category:string;
rentals : Rental[] = [];
errors:any[] = [];

  constructor(private route:ActivatedRoute , private rentalService:RentalService) { }

  ngOnInit() {
  	this.route.params.subscribe(
  		(params)=>{
  			this.city = params['city'];
        this.bedrooms = params['bedrooms'];
        this.category= params['category'];
  			this.getRentals();

  	})
  }

    getRentals() {
    this.rentalService.getRentalsByCity(this.city,this.bedrooms,this.category).subscribe(
      (rentals: Rental[]) => {
        debugger;
        this.rentals = rentals;
        console.log(this.rentals);
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      })
      
  }

}
