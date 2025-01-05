import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-access-denied',
    templateUrl: './access-denied.component.html',
    styleUrls: ['./access-denied.component.scss'],
    standalone: false
})
export class AccessDeniedComponent implements OnInit {
  currentUser: any = null;

  constructor(private auth : AuthService) { }

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
