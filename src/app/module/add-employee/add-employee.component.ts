import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;
  isSubmitted: boolean = false;
  addEmployeeFormParent! :FormGroup;
  tasksForm? : FormGroup ;
  constructor(private _formBuilder: FormBuilder,private router: Router, private httpProvider: EmployeeService, private toastr: ToastrService) { 



  }

  ngOnInit(): void { 
    // this.addEmployeeForm =
    // this.tasks = this._formBuilder.array([])
    this.addEmployeeFormParent = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      tasks: this._formBuilder.array([])
    });
   }

  AddEmployee(isValid: any) {
    let tasksEmp :any = [];
    let i=1;
    this.tasksArraya?.controls.map(task => {
        tasksEmp.push({
          name : task.value,
          description : "Sumb DEscription For Task "+i,
        })
    })

    let formPost = { EmployeeName : this.addEmployeeForm.name,
      tasksEmployee : tasksEmp
    }

    this.isSubmitted = true;
      this.httpProvider.saveEmployee(formPost).subscribe(async data => {
          if (data != null ) {
            if ( data.success) {
              this.toastr.success("created ");
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 500);
            }
        }
      },
        async error => {
          this.toastr.error("VAlidation Error");
          setTimeout(() => {
            // this.router.navigate(['/Home']);
          }, 500);
        });
    console.log("aaaaa",this.addEmployeeForm)

  }

  get tasksArraya() {
    return this.addEmployeeFormParent.get('tasks') as FormArray;
  }  

  addTasks() {
    this.tasksArraya.push(
      // this._formBuilder.group({
       new FormControl('', [Validators.required]),
      // })

    );

    console.log(this.tasksArraya)
  }
  deleteTasks(i:any) {
    this.tasksArraya!.removeAt(i);
  }

}

export class employeeForm {
  name: string = "";
}
