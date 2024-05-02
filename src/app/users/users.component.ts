import { Component,ViewChild,OnInit} from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TimesheetService } from '../services/timesheet.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from '../services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule,HttpClientModule,MatTableModule,RouterModule,MatFormFieldModule,MatDividerModule, MatCardModule,MatDialogModule,MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers : [AuthServiceService , UserService]
})
export class UsersComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  getUserDetails:any
  currentPage: number = 0;
  itemsPerPage: number = 10; // assuming you have 10 items per page, adjust as needed
  myColumns = ['__v', 'name', 'emp_code', 'email', 'role','mobile',  'date_of_birth','date_of_joining', 'actions'];
  resultOfRoute :any;
  constructor(public router : Router,
    public timesheetService :TimesheetService,
    public userService : UserService
  ){

  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.paginator?.page.subscribe((event: PageEvent) => {
        this.currentPage = event.pageIndex;
        this.itemsPerPage = event.pageSize;
      });
    }, 0);
  }
  
  routerForUser(action: string, user: any): void {
    let data :any
        if(action == 'add'){
          data = {
             action :action
          }
       }
      else{
          data = {
             action :action,
             user:user._id
         }
    }
    if (action === 'add') {
      this.router.navigate(['/userForm/'+JSON.stringify(data)]);
    } else if (action === 'edit' && user) {
      console.log(data)
      this.router.navigate(['/userForm/'+JSON.stringify(data)]);
    }
  }

  getAllUsers(){
  this.userService.getAllUsers().subscribe((users:any)=>{
    if(users.status == 200){
      this.getUserDetails = new MatTableDataSource(users['result']);
      this.getUserDetails.paginator = this.paginator;
    }
 else{

 }
  })
  
  }
  editUser(user:any){
    console.log(user)
   this.routerForUser('edit',user)
  }
}
