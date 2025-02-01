import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FirestoredbService, DBC } from '../shared/firestoredb.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false,
})
export class SignupComponent implements OnInit {
  email: string = '';
  username: string = '';
  contactno: string = '';
  password: string = '';
  allProducts: DBC[] = [];
  selectedProduct: DBC | undefined;
  id: string = '';
  Image: string = '';
  Name: string = '';
  Details: string = '';
  Composition: string = '';
  Indication: string = '';
  productObj: DBC = {
    id: '', 
    productCategories: [], 
    name: '', 
    image: '', 
    details: '', 
    composition: '', 
    indication: '' 
  };
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
  selectedCategory: string = this.productCategories[0];
  userCategories: string[] = [
    'Ortho',
    'Gynae',
    'General',
    'Neuro',
    'Gastro',
    'Nephro',
    'Immunology',
    'Sleep',
  ];
  selectedUserCategory: string = this.userCategories[0];

  activeTab: string = 'user';
  image: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private auth: AuthService,
    @Inject(ToastrService) private toastr: ToastrService,
    private fsds: FirestoredbService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  editProduct(product: any): void {
    product.editing = true;
    this.selectedProduct = product;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  signup(): void {
    if (!this.email) {
      this.toastr.warning('Please enter a valid Email');
      return;
    }
    if (!this.password) {
      this.toastr.warning('Please enter a valid Password');
      return;
    }

    this.auth
      .signup(this.email, this.username, this.selectedUserCategory, this.contactno, this.password)
      .then(() => {
        this.toastr.success('Signup successful!');
        this.clearFields();
        this.auth.logout();
      })
      .catch((err) => {
        console.error('Signup Error:', err);
        this.toastr.error('Signup failed. Please try again.');
      });
  }

  private clearFields(): void {
    this.email = '';
    this.username = '';
    this.contactno = '';
    this.password = '';
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        this.toastr.error('File size exceeds 1 MB. Please upload a smaller image.');
        return;
      }

      this.image = file;

      this.readFileAsDataURL(file)
        .then((result: string) => {
          this.imagePreview = result;
          this.Image = result;
          if (this.selectedProduct) {
            this.selectedProduct.image = result;
          }
        })
        .catch((error) => {
          console.error('Error reading file:', error);
          this.toastr.error('Please provide a valid image file.');
        });
    }
  }

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  }

  getAll(): void {
    this.fsds.getAll().subscribe(
      (res) => {
        this.allProducts = res.map((e) => {
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

  resetForm(): void {
    this.Name = '';
    this.Image = '';
    this.Details = '';
    this.Composition = '';
    this.Indication = '';
    this.selectedCategory = this.productCategories[0];
  }

  addProduct(): void {
    if (this.Name && this.selectedCategory && this.Image && this.Details && this.Composition && this.Indication) {
      this.productObj.id = this.id;
      this.productObj.name = this.Name;
      this.productObj.productCategories = [this.selectedCategory];
      this.productObj.image = this.Image;
      this.productObj.details = this.Details;
      this.productObj.composition = this.Composition;
      this.productObj.indication = this.Indication;

      this.fsds
        .addProduct(this.productObj)
        .then(() => {
          this.toastr.success('Product added successfully');
          this.resetForm();
          this.image = null;
          this.imagePreview = 'assets/images/upload_area.svg';
          this.Image = '';
        })
        .catch((error) => {
          console.log(error);
          this.toastr.error('Failed to add product.');
        });
    } else {
      this.toastr.warning('Please fill in all the fields.');
    }
  }

  addPromotions(): void {
    this.toastr.info('This feature is coming soon!');
  }

  deleteProduct(product: DBC): void {
    if (window.confirm('Are you sure you want to delete this product? ' + product.name)) {
      this.fsds
        .deleteProduct(product)
        .then(() => {
          this.toastr.success('Product deleted successfully');
        })
        .catch((error) => {
          this.toastr.warning(error);
        });
    } else {
      this.toastr.warning('Deletion cancelled');
    }
  }

  updateProduct(product: DBC): void {
    product.editing = false;
  
    // Ensure productCategories is updated properly
    if (this.selectedCategory) {
      product.productCategories = [this.selectedCategory]; 
    }
  
    this.fsds
      .updateProduct(product)
      .then(() => {
        this.toastr.success('Product updated successfully');
      })
      .catch((error) => {
        console.error('Failed to update product:', error);
        this.toastr.error('Failed to update the product. Please try again.');
      });
  }

  cancelEdit(product: DBC): void {
    product.editing = !product.editing;
  }
}
