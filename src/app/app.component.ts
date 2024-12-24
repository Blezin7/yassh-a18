import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'yassh';
  currentUser: any = null;

  constructor(
    @Inject(Router) private router: Router,
    public auth: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private changeDetector: ChangeDetectorRef
  ) {}

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

  reload() {
    this.document.location.reload();
    this.loadUserFromSession();
  }

  adminOnly(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles['admin'] === true;
    }
    return false;
  }

  logOut() {
    this.auth.logout();
  }
}
