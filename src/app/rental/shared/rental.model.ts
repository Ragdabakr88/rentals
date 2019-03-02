

import { Booking } from '../../booking/shared/booking.model';
import { Review } from '../../review/shared/review.model';
export class Rental {

static readonly CATEGORIES = ["house" ,"apartment" ,"condo"];
	id:string;
	title:string;
	city:string;
	street:string;
	category:string;
	image:string;
	bedrooms:number;
	description:string;
	dailyRate:number;
	space:number;
	bathrooms:number;
	shared:boolean;
	createdAt:string;
	bookings:Booking[];
	reviews:Review[];
}