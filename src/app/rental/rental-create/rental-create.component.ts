import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit {

 newRental: Rental;
 rentalCategories = Rental.CATEGORIES;
 errors:any[] = [];
 imageUrl :string;

  constructor(private rentalService:RentalService,
              private router: Router) {}

            

 // handleImageChange() {
 //    this.newRental.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg";
 //  }

  ngOnInit() {
  	this.newRental = new Rental();
  	this.newRental.shared = true;
   
  }


handleImageUpload(imageUrl: string) {
  debugger;
    this.newRental.image = imageUrl;

    console.log('logger');
    console.log(imageUrl);
    console.log(this.newRental.image);
  }

  handleImageError() {
    this.newRental.image = '';
  }

createRental(){
	this.rentalService.createRental(this.newRental).subscribe(
       (rental:Rental)=>{
        debugger;
         console.log("this.newRental",this.newRental);
          this.router.navigate(['/rentals']);
      },
       
        (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      })
     }

 



}
