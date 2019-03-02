
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rentals: any , term: any): any{
  	if(term === undefined) return rentals;
  	return rentals.filter(function(rental){
  		return rental.city.toLowerCase().includes(term.toLowerCase());
  	})
    
  }
}