import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-productdetails',
    templateUrl: './productdetails.component.html',
    styleUrls: ['./productdetails.component.scss'],
    standalone: false
})
export class ProductdetailsComponent implements OnInit {
  currentUser: any = null;

  constructor(public auth: AuthService,) { }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserSignal();
    this.loadUserFromSession();
  }

  private loadUserFromSession(): void {
    const user = sessionStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }
}
