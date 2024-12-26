import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inject } from '@angular/core';  
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-career',
    templateUrl: './career.component.html',
    styleUrls: ['./career.component.scss'],
    standalone: false
})
export class CareerComponent implements OnInit {


  constructor(@Inject(DOCUMENT) private document: Document) { 
  }

  ngOnInit(): void {
  }
}
