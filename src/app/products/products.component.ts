import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';  
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    standalone: false
})
export class ProductsComponent implements OnInit {
  currentUser: any = null;

  constructor(private auth : AuthService, @Inject(Router) private router: Router, @Inject(DOCUMENT) private document: Document) { 
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  reload(){
    this.document.location.reload();
  }

}
