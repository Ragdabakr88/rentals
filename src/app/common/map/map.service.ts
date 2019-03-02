import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{CamelizePipe} from 'ngx-pipes';

@Injectable()
export class MapService{
	private geoCoder;
	private locationCashe:any = {};

	constructor(private camelizePipe:CamelizePipe){}

	private cacheLocation(location:string,coordinates:any){
		const camelizedLocation = this.camelizePipe.transform(location);
		this.locationCashe[camelizedLocation ] = coordinates;
	}
	
	public geocodeLocation(location:string): Observable<any>{
		this.geoCoder = new (<any>window).google.maps.Geocoder();
		return new Observable((Observer) => {

              			this.geoCoder.geocode({address:location}, (result,status) => {
				if(status === 'OK'){
					const geometry = result[0].geometry.location;
					const coordinates = {lat:geometry.lat(), lng:geometry.lng()};

					this.cacheLocation(location,coordinates);
					Observer.next(coordinates);
				}else{
					Observer.error('Location not Found');
				}

			});

         
       });

	}
}



