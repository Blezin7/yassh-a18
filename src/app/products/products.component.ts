import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,AfterViewInit {
  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef;
  private scrollPosition: number = 0;

  activeTab: string = '1';

  productDetails: { [key: string]: string } = {
    '1': 'bone-health',
    '2': "womens-health",
    '3': "mens-health",
    '4': 'nerve-health',
    '5': 'digestive & liver-health',
    '6': 'immunomodulators',
    '7': 'sleepcare',
    '8': 'skin & hair-care',
    '9': 'cardiovascular-health',
    '10': 'general-well-being'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          const savedScroll = sessionStorage.getItem('tabsScrollPosition');
          if (this.tabsContainer && savedScroll) {
            this.tabsContainer.nativeElement.scrollLeft = parseInt(savedScroll, 10);
          }
        }, 0);
      }
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const savedScroll = sessionStorage.getItem('tabsScrollPosition');
      if (this.tabsContainer && savedScroll) {
        this.tabsContainer.nativeElement.scrollLeft = parseInt(savedScroll, 10);
      }
    }, 0);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  formatProductName(value: string): string {
    return value.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  scrollTabs(container: HTMLElement, amount:number): void {
    container.scrollBy({left:amount,behavior:'smooth'})
  }
  showTab(event:Event):void{
    const tabElement = event.target as HTMLElement;
    if(tabElement){
      tabElement.scrollIntoView({behavior:'smooth',inline:'center'})
    }
  }
  onTabClick(event: Event, productKey: string): void {
    if (this.tabsContainer) {
      // Save scroll position before navigating
      sessionStorage.setItem('tabsScrollPosition', this.tabsContainer.nativeElement.scrollLeft.toString());
    }
  } 
}
