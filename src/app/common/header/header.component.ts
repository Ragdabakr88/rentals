import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',]
})
export class HeaderComponent implements OnInit {
city:string;
  constructor(private auth:AuthService,private router: Router) { }



  ngOnInit() {
  }

 logout(){
	 this.auth.logout();
	  this.router.navigate(['/login']);
}
search(city:string){
	this.router.navigate([`/rentals/${city}/homes`])
}

}
