
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCat'
})
export class FilterCatPipe implements PipeTransform {

  transform(rentals: any , cat: any): any{
  	if(cat === undefined) return rentals;
  	return rentals.filter(function(rental){
  		return rental.title.toLowerCase().includes(cat.toLowerCase());
  	})
    
  }
}