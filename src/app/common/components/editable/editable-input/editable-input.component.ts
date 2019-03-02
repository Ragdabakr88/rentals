import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.css']
})
export class EditableInputComponent implements OnInit {

@Input() entity: any;//refare to models rental booking user any
@Input() set field(entityField:string){//field in the model
   debugger;
   this.entityField = entityField;
   this.setOriginValue();
}
@Input() className:string;
@Input() type:string = 'text';
@Output() entityUpdated = new EventEmitter();

public originEntityValue:any;
public entityField:string;

isActiveInput: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  //   updateEntity() {
  // // const a = {[this.field]: this.entity[this.field]};
  //     this.entityUpdated.emit({[this.field]: this.entity[this.field]});
  //     console.log("cvbnm,");

  //   }

  updateEntity() {
 debugger;
 const entityValue = this.entity[this.entityField];
 if(entityValue !== this.originEntityValue ){
      this.entityUpdated.emit({[this.entityField]: this.entity[this.entityField]});
      this.setOriginValue();
      }
      this.isActiveInput = false;
    }

setOriginValue(){
	this.originEntityValue = this.entity[this.entityField];
   }

   cancelUpdate(){
   	this.isActiveInput = false;
   	this.entity[this.entityField] = this.originEntityValue;
   }

}
