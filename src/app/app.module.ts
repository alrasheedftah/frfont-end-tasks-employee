import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helper/jwt.interceptor';
import { ErrorsInterceptor } from './_helper/errors.interceptor';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultModule } from './layouts/default/default.module';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AddEmployeeComponent } from './module/add-employee/add-employee.component';
import { EditEmployeeComponent } from './module/edit-employee/edit-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DefaultModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
    {provide: APP_BASE_HREF, useValue : '/' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
