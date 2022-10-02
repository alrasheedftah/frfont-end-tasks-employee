import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { MybottomSheetComponent } from 'src/app/_shared/components/widget/mybottom-sheet/mybottom-sheet.component';

export interface PeriodicElement {
  name: string;
  id: number;
  degree: string;
  salary: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
];


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name','dateAdded','update','delete'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource:any;



  employees : any= [];
   
  constructor( private toastr: ToastrService,private router: Router,private route: ActivatedRoute,
     private httpProvider : EmployeeService,private modalService:NgbModal,
    private _bottomSheet: MatBottomSheet
     
     ) { }
  
  ngOnInit(): void {
    this.getAllEmployee();

    this.dataSource.paginator = this.paginator;
    
  }
  async getAllEmployee() {
    this.httpProvider.getAllEmployee().subscribe((data : any) => {
      
      if (data != null ) {
        console.log(data)

          this.employees = data.result;
          this.dataSource = new MatTableDataSource<PeriodicElement>(this.employees);          
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.messageResult){
              this.employees = [];
            }
          }
        }
      });
  }


  AddEmployee(employee:any) {
    // this.router.navigate(['AddEmployee']);
    this._bottomSheet.open(MybottomSheetComponent,{
      data:{
        employee: employee
      }
    });

  }

  deleteEmployeeConfirmation(employee: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteEmployee(employee);
      },
        (reason) => {});
  }

  deleteEmployee(employee: any) {
    this.httpProvider.deleteEmployeeById(employee.id).subscribe((data : any) => {
      if (data != null && data.success ) {
          this.toastr.success(data.messageResult);
          this.getAllEmployee();
      }
    },
    (error : any) => {
      this.getAllEmployee();
    });
  }  
}





@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
