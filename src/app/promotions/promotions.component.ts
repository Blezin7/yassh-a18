import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-promotions',
    templateUrl: './promotions.component.html',
    styleUrls: ['./promotions.component.scss'],
    standalone: false
})
export class PromotionsComponent implements OnInit {
  currentUser: any = null;

  constructor() { }

  ngOnInit(): void {
    this.loadUserFromSession();
  }

  private loadUserFromSession(): void {
    const user = sessionStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  reload(){
    this.loadUserFromSession()
  }

}
