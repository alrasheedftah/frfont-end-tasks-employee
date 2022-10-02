import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;



  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: EmployeeService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.getEmployeeDetailById();
  }
  getEmployeeDetailById() {
    this.httpProvider.getEmployeeDetailById(this.employeeId).subscribe((data: any) => {
      if (data != null ) {
        var resultData = data;
        if (resultData) {
          this.editEmployeeForm.id = resultData.id;
          this.editEmployeeForm.name = resultData.name;
        }
      }
    },
      (error: any) => { });
  }

  EditEmployee(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveEmployee(this.editEmployeeForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}


export class employeeForm {
  id :string = ""
  name: string = "";
}