import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductdetailsService } from '../productdetails.service';
import { DBC, FirestoredbService } from '../shared/firestoredb.service';

@Component({
  selector: 'app-productdetails',
  standalone: false,
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  allProducts: Product[] = [];
  selectedProduct: Product | undefined;
  splitexp: string[] = [];
  dbProducts: DBC[] = [];
  filteredProducts: DBC[] = [];
  loader: boolean = true;
  productObj: DBC = {
    id: '',
    productCategories: [],
    name: '',
    image: '',
    details: '',
    composition: '',
    dosage: '',
    package: '',
    indication: '',
  };

  productCategories: string[] = [
    'Bone Health',
    "Women's Health",
    "Men's Health",
    'Nerve Health',
    'Digestive & Liver Health',
    'Immunomodulator',
    'Sleepcare',
    'Skin & Hair Care',
    'Cardiovascular Health',
    'General well being',
  ];

  constructor(
    public prod: ProductdetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private fsds: FirestoredbService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('pageReloaded')) {
      localStorage.setItem('pageReloaded', 'true');
    } else {
      localStorage.removeItem('pageReloaded');
    }
    this.loader = true;
    this.getAll();

    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.selectedProduct = this.prod.productitems.find(
        (product) => product.id === id
      );

      if (this.selectedProduct?.explanation) {
        this.splitexp = this.selectedProduct.explanation
          .split('. ')
          .filter((sentence) => sentence.trim() !== '');
      }
      this.filterProducts();
    });
  }

  getAll(): void {
    this.fsds.getAll().subscribe(
      (res) => {
        this.dbProducts = res.map((e) => {
          const data = e.payload.doc.data() as DBC;
          data.id = e.payload.doc.id;
          return data;
        });

        this.filterProducts();
        this.loader = false;
      },
      (err) => {
        console.error('Error fetching products:', err);
      }
    );
  }

  filterProducts(): void {
    if (this.selectedProduct) {
      this.filteredProducts = this.dbProducts.filter((product) =>
        product.productCategories.includes(this.selectedProduct!.name)
      );
    } else {
      this.filteredProducts = [...this.dbProducts];
    }
  }

  goToDetails(productId: string): void {
    this.router.navigate([`products/cataloguedetails/${productId}`]);
  }

  onProductClick(id: number): void {
    this.selectedProduct = this.allProducts.find(
      (product) => product.id === id
    );

    if (this.selectedProduct?.explanation) {
      this.splitexp = this.selectedProduct.explanation
        .split('. ')
        .filter((sentence) => sentence.trim() !== '');
    }
    this.filterProducts();
  }
}