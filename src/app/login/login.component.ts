import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  currentUser: any = null;
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private toastr: ToastrService) { }

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

  async login(): Promise<void> {
    if (!this.email || !this.password) {
      this.toastr.warning('Please enter a valid Email and Password');
      return;
    }

    try {
      await this.auth.login(this.email, this.password);
      this.email = '';
      this.password = '';
    } catch (error) {
      console.error('Login error:', error);
      this.toastr.error('Login failed. Please try again.');
    }
  }
}
