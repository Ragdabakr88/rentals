import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Review } from './shared/review.model';
import { ReviewService } from './shared/review.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent {
	@Input() bookingId:string;
	@Output() reviewSubmitted = new EventEmitter();
    modalRef:any;
   review: Review = {text: '', rating: 3};
    errors:any[] = [];


  constructor( private modalService: NgbModal, 
              private reviewService: ReviewService,
  	) { }

openReviewModal(content) {
   	console.log("tyuiop");
     this.modalRef = this.modalService.open(content);
   }

handleRatingChange(event) {
	debugger;
	this.review.rating = event.rating;
}  

   confirmReview(review) {
     debugger;
     this.reviewService.createReview(this.review, this.bookingId)
       .subscribe(
         (review: Review) => {
          console.log("rev" , review);
           // this.reviewSubmitted.emit(review);
           // console.log("xscxwdc",review);
           this.modalRef.close();
         },
         (errorResponse: HttpErrorResponse) => {
           this.errors = errorResponse.error.errors;
         })
   }


}
