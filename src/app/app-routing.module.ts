import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AddEmployeeComponent } from './module/add-employee/add-employee.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { EditEmployeeComponent } from './module/edit-employee/edit-employee.component';
import { EmployeeComponent } from './module/employee/employee.component';
import { AuthGuard } from './_helper/auth.guard';

const routes: Routes = [
  { path:"register" , component:RegisterComponent },
  { path:"login" , component:LoginComponent },
  {
    path:'',
    canActivate : [AuthGuard],
    component:DefaultComponent,
    children:[{
      path:'',
      component:DashboardComponent
    },
    {
      path : 'employee',
      canActivate: [AuthGuard],
      component : EmployeeComponent
    },
    {
      path : 'add-employee',
      canActivate: [AuthGuard],
      component : AddEmployeeComponent
    },  
    {
      path : 'edit-employee/:id',
      canActivate: [AuthGuard],
      component : EditEmployeeComponent
    },        
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
