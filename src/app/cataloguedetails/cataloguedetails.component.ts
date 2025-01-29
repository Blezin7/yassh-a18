import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import AOS from 'aos';
import { DBC, FirestoredbService } from '../shared/firestoredb.service';
import { Product } from '../product.model';


@Component({
  selector: 'app-cataloguedetails',
  standalone: false,
  templateUrl: './cataloguedetails.component.html',
  styleUrl: './cataloguedetails.component.scss'
})
export class CataloguedetailsComponent implements OnInit{
  dbProducts: DBC[] = [];
  product: DBC[] = [];
  selectedProduct: Product | undefined
  productObj: DBC = { id: '', productCategories: [], name: '', image: '', details: '', composition: '', indication: '' };

  constructor(
    private aroute: ActivatedRoute,
    private fsds: FirestoredbService,
    private router:Router
  ) {}

  ngOnInit():void{
    const productId = this.aroute.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductById(productId);
    }
    this.getAll();
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


getProductById(productId: string): void {
  this.fsds.getAll().subscribe(
    (res) => {
      const products = res.map((e) => {
        const data = e.payload.doc.data() as DBC;
        data.id = e.payload.doc.id;
        return data;
      });
      const foundProduct = products.find((p) => p.id === productId);
      this.product = foundProduct ? [foundProduct] : [];
    },
    (err) => {
      console.error('Error fetching product:', err);
    }
  );
}
}
