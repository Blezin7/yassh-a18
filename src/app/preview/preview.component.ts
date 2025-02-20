import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DBC, FirestoredbService } from '../shared/firestoredb.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cataloguedetails',
  standalone: false,
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {
  dbProducts: DBC[] = [];
  filteredProducts: DBC[] = [];
  product: DBC | undefined;
  goback = {
    1:'Bone Health',
    2:"Women's Health",
    3:"Men's Health",
    4:'Nerve Health',
    5:'Digestive & Liver Health',
    6:'Immunomodulator',
    7:'Sleepcare',
    8:'Skin & Hair Care',
    9:'Cardiovascular Health',
    10:'General Well Being',
    
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
    'General Well Being',
  ];
  selectedCategory: string = '';
  splitdetails: string[] = [];
  splitcomposition: string[] = [];
  splitindications: string[] = [];
  splitdosage: string[] = [];
  activeTab:string='view';
  Image: string = '';
  image: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private aroute: ActivatedRoute,
    private fsds: FirestoredbService,
    private router: Router,
    @Inject(ToastrService) private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    const productId = this.aroute.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductById(productId);
    }
    this.getAll();
    console.log(this.splitdosage);
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
        this.selectedCategory = this.product?.productCategories[0] ? this.product.productCategories[0] : 'Bone Health'
        console.log('Selected Product:', this.product);
        if (this.product?.details) {
          this.splitdetails = this.splitString(this.product.details,'\n');
        }
        if (this.product?.composition)  {
          this.splitcomposition = this.splitString(this.product.composition,'\n');
        }
        if (this.product?.indication)  {
          this.splitindications = this.splitString(this.product.indication,'\n');
        }
        if (this.product?.dosage)  {
          this.splitdosage = this.splitString(this.product.dosage,'\n');
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
        .slice(0, 4);
    } else {
      this.filteredProducts = this.dbProducts.slice(0, 4);
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
  setActiveTab(tab: string): void {
    this.router.navigate(['/signup'], {
      queryParams: { tab: tab },
      queryParamsHandling: 'merge'
    });
  }

  editProduct(product: any): void {
    product.editing = true;
  }

  cancelEdit(product: any){
    product.editing = false;
  }

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        console.error('File size exceeds 1 MB. Please upload a smaller image.');
        return;
      }

      this.image = file;

      this.readFileAsDataURL(file)
        .then((result: string) => {
          this.imagePreview = result;
          this.Image = result;
          if (this.product) {
            this.product.image = result;
          }
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  }

  updateProductById(): void {
    const productId = this.aroute.snapshot.paramMap.get('id');
    if (!productId) {
      console.error('No product ID found in route parameters.');
      return;
    }

    if (!this.product) {
      console.error('No product selected to update.');
      return;
    }

    this.product.editing = false;

    if (this.selectedCategory) {
      this.product.productCategories = [this.selectedCategory];
    }

    this.fsds
      .updateProduct(this.product)
      .then(() => {
        this.toastr.success('Product updated successfully');
      })
      .catch((error) => {
        console.error('Failed to update product:', error);
        this.toastr.error('Failed to update the product. Please try again.');
      });
  }
  
}