import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductdetailsService } from '../productdetails.service';
import AOS from 'aos';
import { DBC, FirestoredbService } from '../shared/firestoredb.service';

@Component({
  selector: 'app-productdetails',
  standalone: false,
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})

export class ProductdetailsComponent implements OnInit, AfterViewChecked{
  allProducts: Product[] = []
  selectedProduct: Product | undefined
  splitexp: string[] = []
  dbProducts: DBC[] = [];
  productObj: DBC = { id: '', productCategories: [], name: '', image: '', details: '', composition: '', indication: '' };
  productCategories: string[] = [
    'Bone Health',
    "Women's Health",
    "Men's Health",
    'Nerve Health',
    'GI Health',
    'Renal Health',
    'Immunomodulator',
    'Sleepcare',
  ];

  constructor( public prod:ProductdetailsService, private route:ActivatedRoute, private router:Router, private fsds: FirestoredbService ) { }

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
      this.getAll()
      
    AOS.init({
      offset: 0,
      delay: 100,
      duration: 1000,
      easing: 'ease',
      once: false, 
      mirror: false 
    });
  }

  getAll(): void {
      this.fsds.getAll().subscribe(
        (res) => {
          this.dbProducts = res.map((e) => {
            const data = e.payload.doc.data() as DBC;
            data.id = e.payload.doc.id;
            return data as DBC;
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  goToDetails(productId: string): void {
    const id = this.selectedProduct?.id;
    this.router.navigate([`products/cataloguedetails/${productId}`]);
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
  