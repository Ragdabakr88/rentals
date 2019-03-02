
import { Rental } from '../../rental/shared/rental.model';



export class Booking {
 static readonly DATE_FORMAT = 'Y/MM/DD';
	
   _id:string;
	startDate:string;
	endDate:string;
	days:number;
    guests:number;
	rental:Rental;
	token:any;
	totalPrice:number;
	createdAt:string;
}