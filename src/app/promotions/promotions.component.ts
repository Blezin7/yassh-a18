import { Component, Injectable, OnInit } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';    
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../shared/auth.service';


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
