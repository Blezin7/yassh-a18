import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-productdetails',
    templateUrl: './productdetails.component.html',
    styleUrls: ['./productdetails.component.scss'],
    standalone: false
})
export class ProductdetailsComponent implements OnInit {
  currentUser: any = null;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

}
