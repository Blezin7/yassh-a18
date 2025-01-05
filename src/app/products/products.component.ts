import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';  
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    standalone: false
})
export class ProductsComponent implements OnInit {
  currentUser: any = null;

  constructor(private auth : AuthService, @Inject(Router) private router: Router) { 
  }
  
  ngOnInit(): void {
    this.currentUser = this.auth.currentUserSignal();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.loadUserFromSession();
  }
  
  private loadUserFromSession(): void {
    const user = sessionStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }
}
