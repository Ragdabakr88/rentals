import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RentalService } from '../shared/rental.service';
import{AuthService} from '../../auth/shared/auth.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.css']
})
export class RentalUpdateComponent implements OnInit {
rental:Rental;

  constructor(
  	private route:ActivatedRoute ,
  	private rentalService:RentalService, 
  	private auth:AuthService) { }

  ngOnInit() {

  	this.route.params.subscribe((params)=>{
      this.getRental(params['rentalId']);
  	});


  }

getRental(rentalId:string){
 	this.rentalService.getRentalById(rentalId).subscribe(
 		(rental:Rental)=>{
          this.rental = rental;

 	    },
 	    ()=>{

 	       })
        }
//rentalId:string,rentalData:any
updateRental(rentalId:string,rentalData:any){
	console.log(rentalId , rentalData);
		    
  this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updatedRental: Rental) => {
        this.rental = updatedRental;
       debugger;
        })

     }

}
