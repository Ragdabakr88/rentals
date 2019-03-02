import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Rental } from '../../rental/shared/rental.model';
import { RentalService } from '../../rental/shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';//toster

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.css']
})
export class ManageRentalComponent implements OnInit {

rentals:Rental[] = [] ;
// errors:any[] = [];

rental:Rental;
rentalDeleteIndex:number;
  constructor(

    private rentalService:RentalService,
     private toastr: ToastsManager ,//toster
    private vcr: ViewContainerRef, //toster
    ) 
    { 
this.toastr.setRootViewContainerRef(vcr);//toster

  }

  ngOnInit( ) {

    this.rentalService.getUserRentals().subscribe(
      (rentals:Rental[])=>{
        debugger;
         // console.log(rentals);
         this.rentals = rentals;

      },
      ()=>{

      });

  }




deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        this.rentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
      });
             
  }

}
