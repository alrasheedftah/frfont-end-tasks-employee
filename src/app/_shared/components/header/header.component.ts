import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import {  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    // output To Handle Evevnt Switch open close sidebar
    @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

    currentUser: User = null!;
    direction: string[] | undefined;
  
  
    constructor(
      private authenticationService: AuthService,
      private router: Router,
    ) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
  
    toggleSideBar() {
      this.toggleSideBarForMe.emit();
      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
    }
  
    

  ngOnInit(): void {
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
