import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DBC, FirestoredbService } from '../shared/firestoredb.service';

@Component({
  selector: 'app-cataloguedetails',
  standalone: false,
  templateUrl: './cataloguedetails.component.html',
  styleUrl: './cataloguedetails.component.scss',
})
export class CataloguedetailsComponent implements OnInit {
  dbProducts: DBC[] = [];
  filteredProducts: DBC[] = [];
  product: DBC | undefined;
  goback = {
    1:'Bone Health',
    2:"Women's Health",
    3:"Men's Health",
    4:'Nerve Health',
    5:'GI Health',
    6:'Renal Health',
    7:'Immunomodulator',
    8:'Sleepcare',
    
  };
  splitdetails: string[] = [];
  splitcomposition: string[] = [];
  splitindications: string[] = [];


  constructor(
    private aroute: ActivatedRoute,
    private fsds: FirestoredbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.aroute.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductById(productId);
    }
    this.getAll();
  }

  goBack(): void {
    if (!this.product?.productCategories[0]) {
      return;
    }
    let categoryKey = Object.keys(this.goback).find(
      (key) => this.goback[key as unknown as keyof typeof this.goback] === this.product?.productCategories[0]
    );
  
    if (categoryKey) {
      this.router.navigate([`/products/proditem/${categoryKey}`]);
    }
  }

  getAll(): void {
    this.fsds.getAll().subscribe(
      (res) => {
        this.dbProducts = res.map((e) => {
          const data = e.payload.doc.data() as DBC;
          data.id = e.payload.doc.id;
          return data;
        });

        console.log('All Products:', this.dbProducts);
        if (this.product) {
          this.filterProducts();
        }
      },
      (err) => {
        console.error('Error fetching all products:', err);
      }
    );
  }

  getProductById(productId: string): void {
    this.fsds.getAll().subscribe(
      (res) => {
        const products = res.map((e) => {
          const data = e.payload.doc.data() as DBC;
          data.id = e.payload.doc.id;
          return data;
        });

        this.product = products.find((p) => p.id === productId);
        console.log('Selected Product:', this.product);

        if (this.product?.details) {
          this.splitdetails = this.splitString(this.product.details,'. ');
        }
        if (this.product?.composition)  {
          this.splitcomposition = this.splitString(this.product.composition,', ');
        }
        if (this.product?.indication)  {
          this.splitindications = this.splitString(this.product.indication,'. ');
        }

        if (this.dbProducts.length > 0) {
          this.filterProducts();
        }
      },
      (err) => {
        console.error('Error fetching product:', err);
      }
    );
  }

  filterProducts(): void {
    if (this.product && this.product.productCategories?.length > 0) {
      this.filteredProducts = this.dbProducts
        .filter(
          (p) =>
            p.id !== this.product!.id &&
            p.productCategories.includes(this.product!.productCategories[0])
        )
        .slice(0, 5);
    } else {
      this.filteredProducts = this.dbProducts.slice(0, 5);
    }
    console.log('Filtered Products:', this.filteredProducts);
  }

  goToDetails(productId: string): void {
    this.router.navigate([`products/cataloguedetails/${productId}`]);
  }

  splitString(text: string, delimiter: string): string[] {
    if (!text) {
      return [];
    }
    return text.split(delimiter).filter((sentence) => sentence.trim() !== '');
  }

}
