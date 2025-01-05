import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductdetailsService } from '../productdetails.service';
import AOS from 'aos';

@Component({
  selector: 'app-productdetails',
  standalone: false,
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit, AfterViewChecked{
  allProducts: Product[] = []; 
selectedProduct: Product | undefined;
splitexp: string[] = [];


  constructor( public prod:ProductdetailsService,private route:ActivatedRoute ) { }
  ngOnInit(): void {
    if (!localStorage.getItem('pageReloaded')) {
      localStorage.setItem('pageReloaded', 'true');  
    } else {
      localStorage.removeItem('pageReloaded'); 
    }
  this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); 
      this.selectedProduct = this.prod.productitems.find(
        product => product.id === id
      );
      if (this.selectedProduct && this.selectedProduct.explanation) {
        this.splitexp = this.selectedProduct.explanation
          .split('. ')
          .filter((sentence) => sentence.trim() !== '');
      }
    });
    AOS.init({
      offset: 0,
      delay: 100,
      duration: 1000,
      easing: 'ease',
      once: false, 
      mirror: false 
    });
  }

  ngAfterViewChecked(): void {
    AOS.refresh();
  }
 
  onProductClick(id: number): void {
    
    this.selectedProduct = this.allProducts.find(product => product.id === id);
    if (this.selectedProduct && this.selectedProduct.explanation) {
      this.splitexp = this.selectedProduct.explanation
        .split('. ')
        .filter((sentence) => sentence.trim() !== '');
    }
  }
}
