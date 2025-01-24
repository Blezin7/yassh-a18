import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class JoinUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     AOS.init({
          offset: 0,
          delay: 100,
          duration: 1000,
          easing: 'ease',
          once: false, 
          mirror: false 
        });
      
  }
}
