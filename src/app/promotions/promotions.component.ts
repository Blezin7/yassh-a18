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

  constructor(private auth : AuthService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  reload(){
    const user = sessionStorage.getItem('currentUser');
    this.document.location.reload();
  }

}
