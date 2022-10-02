import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-mybottom-sheet',
  templateUrl: './mybottom-sheet.component.html',
  styleUrls: ['./mybottom-sheet.component.css']
})
export class MybottomSheetComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MybottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {employee : any},
    private taskServices : TasksService,
    private employeeService : EmployeeService,
    private toastr: ToastrService,
    private router: Router    
    ) { }

  ngOnInit(): void {
    this.getAllTasks();
  }
    tasks : any;
  
    allComplete: boolean = false;
  
  
    setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.tasks == null) {
        return;
      }
      this.tasks.forEach((t :any) => (this.data.employee.tasks.push(t)));
    }

    setTask(completed: boolean,taskSelected:any) {
      if (completed == false) {
        this.data.employee.tasks = this.data.employee.tasks.filter((task:any) => task.id != taskSelected.id );
        console.log(this.data.employee.tasks)
        return;

      }
      this.data.employee.tasks.push(taskSelected)
      console.log(this.data.employee.tasks)
    }

    
    getAllTasks(){
      this.taskServices.getAllTask().pipe(first()).
      subscribe((response : any) => {
        console.log(response)
          this.tasks = response.result
          // this.allComplete =  this.data.employee.tasks.length >= response.result.length
          console.log("employee",this.data.employee.tasks)
      },
      (error:any) => { console.log(error); });

    }

    getTaskStatus(id:any){
      return this.data.employee.tasks.filter((task:any) => task.id == id ).length > 0;
    }


    sendUpdated(){
      this.employeeService.updateEmployeeById(this.data.employee.id,this.data.employee).subscribe(async data => {
        console.log(data.result)
        
        // if (data != null ) {
          // if ( data.success) {
            this.toastr.success(data.messageResult);
            setTimeout(() => {
              this.router.navigate(['/employee']);
            }, 500);
          // }
      // }
    },
      async error => {
        console.log(error)
        this.toastr.success("Successfully");
        setTimeout(() => {
          // this.router.navigate(['/Home']);
        }, 500);

        this.toastr.error(error.message);
        setTimeout(() => {
          // this.router.navigate(['/Home']);
        }, 500);
      });

    }

  }

