import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: false
})
export class SignupComponent implements OnInit {

  email: string = ''
  username: string = ''
  contactno: string = ''
  password: string = ''

  constructor(private auth: AuthService, @Inject(ToastrService) private toastr: ToastrService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  signup(): void {
    if (!this.email) {
      this.toastr.warning('Please enter a valid Email');
      return;
    }
    if (!this.password) {
      this.toastr.warning('Please enter a valid Password');
      return;
    }
  
    this.auth.signup(this.email, this.username, this.contactno, this.password)
      .then(() => {
        this.toastr.success('Signup successful!');
        this.clearFields();
        this.auth.logout();
      })
      .catch(err => {
        console.error('Signup Error:', err);
        this.toastr.error('Signup failed. Please try again.')
      });
  }
  
  private clearFields(): void {
    this.email = '';
    this.username = '';
    this.contactno = '';
    this.password = '';
  }
}
