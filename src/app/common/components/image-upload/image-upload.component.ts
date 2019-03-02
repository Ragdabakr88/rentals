
import { Component, OnInit, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import {ImageUploadService } from './shared/image-upload.service';


class FileSnippet {
  pending: boolean = false;
  status: string = 'INIT';

  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent  {
selectedFile:FileSnippet;
  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();



  constructor(private imageServic:ImageUploadService) { }

 private onSucces(imageUrl: string) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'OK';

    this.imageUploaded.emit(imageUrl);
  }

  private onFailure(){
  this.selectedFile.pending = false;
  this.selectedFile.status='FAIL';
  this.imageError.emit(" ");
  }

  // ngOnInit() {
  // }
   
  processFile(imageInput:any){
  	const file:File = imageInput.files[0];
  	const reader = new FileReader();
  	// debugger;
  	reader.addEventListener("load",(event:any)=>{
    this.selectedFile = new FileSnippet(event.target.result,file);
    this.selectedFile.pending = true;
    this.imageServic.uploadImage(this.selectedFile.file).subscribe(
      (imageUrl:string)=>{
      	console.log("imageUrl",imageUrl);
       this.onSucces(imageUrl);

      },
      ()=>{
      	this.onFailure()

      });
  	});

  	reader.readAsDataURL(file);
  }

}
