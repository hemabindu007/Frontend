import { Component,OnInit, WritableSignal ,signal} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { interval } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface Message {
  type: 'Warning' | 'Error';
  text: string;
}
@Component({
  selector: 'app-sprint-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './sprint-form.component.html',
  styleUrl: './sprint-form.component.css',
  providers: [AuthServiceService],
})
@Injectable({providedIn: 'root'})
export class SprintFormComponent implements OnInit{
  profileForm !: FormGroup;
  resultOfRoute:any;
   count:any = signal('hii');
   Title = signal('signals OverView')
   private messageSubject = new Subject<Message>();
  constructor(public formBuilder :FormBuilder,
    public authservice:AuthServiceService
  ){

  }
  ngOnInit(): void {
  // First profileForm
  // console.log(this.messageSubject)
      this.profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    }),
    // aliases: new FormArray([])
  });
  this.getSignals();
  this.getFor();
  this.observableEX();
  this.getData()
  }
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
    // console.log(this.profileForm)
  }
  getData(){
    this.authservice.getData().subscribe((res:any)=>{
      console.log(res)
        this.resultOfRoute = res['message']
    })
  }
  getSignals(){
  
// console.log('Before set count is: ' + this.count());
// this.count.set('Hello');
// console.log('After set count is: ' + this.count());
// Increment the count by 1.
this.count.update((value:any) => value + 'How are you');
// console.log('After updating count is: ' + this.count());

  }
  numbers = [1,2,3,4,5]

  getFor(){
      //forEach
    this.numbers.forEach((number:any)=>{
      // console.log("ForEach value : ", number)
    })
    //map
    let doubledNumbers = this.numbers.map((number:any)=>{
      return number * 2;
    });
    // console.log("map value : " , doubledNumbers)
    //filter
    let evenNumbers = this.numbers.filter((number:any)=>{
      return number%2 == 0;
    })
    // console.log("filter value : " , evenNumbers)
    //reduce
    let reducedValue = this.numbers.reduce((acc,num):any => {
      // console.log('acc value : ',acc)
      // console.log('num value :' , num)
      return acc+num;
    })
    // console.log('Sum value :' , reducedValue)
  }
  observableEX(){
// const secondsCounter = interval(1);
// // console.log(secondsCounter)
// const subscription = secondsCounter.subscribe(n =>
//   console.log(`It's been ${n + 1} seconds since subscribing!`)
// );
let messages$ = this.messageSubject.asObservable();
// console.log(messages$)
this.messageSubject.next({ type: 'Error', text : 'string' });
// console.log(this.messageSubject)
  }
}
