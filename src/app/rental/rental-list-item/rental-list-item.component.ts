import { Component, OnInit,Input } from '@angular/core';
// import { environment } from './../../../environments/environment.ts'

@Component({
  selector: 'app-rental-list-item',
  templateUrl: './rental-list-item.component.html',
  styleUrls: ['./rental-list-item.component.css']
})
export class RentalListItemComponent implements OnInit {

	public serverUrl: string = 'http://localhost:3001'



@Input() rental:any;


  constructor() { }

  ngOnInit() {
 

}
}