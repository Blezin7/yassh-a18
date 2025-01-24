import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  activeTab: string = '1'; // Default active tab

  productDetails: { [key: string]: string } = {
    '1': 'bone-health ',
    '2': "womens-health",
    '3': "mens-health",
    '4': 'nerve-health',
    '5': 'gi-health',
    '6': 'renal-health',
    '7': 'immunomodulators',
    '8': 'sleepcare'
  };

  constructor() {}

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  formatProductName(value: string): string {
    return value.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
}
