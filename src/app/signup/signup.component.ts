import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FirestoredbService, DBC } from '../shared/firestoredb.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false,
})
export class SignupComponent implements OnInit {
  contactForm: any;
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
  Dosage: string = '';
  package: string = '';
  Indication: string = '';
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
  selectedCategory: string = this.productCategories[0];
  userCategories: string[] = [
    'Anaesthesiology',
    'Cardiology',
    'Cardiothoracic Surgery',
    'Dermatology',
    'Diagnostic Radiology',
    'Endocrinology',
    'Gastroenterology',
    'General Surgery',
    'General Medicine',
    'Haematology',
    'Internal Medicine',
    'Medical Oncology',
    'Neurosurgery',
    'Obstetrics & Gynaecology',
    'Ophthalmology',
    'Orthopaedic Surgery',
    'Otorhinolaryngology/ENT',
    'Paediatric Medicine',
    'Pathology',
    'Plastic Surgery',
    'Psychiatry',
    'Radiation Oncology',
    'Rehabilitation Medicine',
    'Renal Medicine',
    'Respiratory Medicine',
    'Rheumatology',
    'Urology',
  ];
  selectedUserCategory: string = '';

  activeTab: string = 'user';
  image: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    @Inject(ToastrService) private toastr: ToastrService,
    private fsds: FirestoredbService
  ) {}

  ngOnInit(): void {
    this.selectedUserCategory = this.userCategories[0];
    this.getAll();
    this.router.routerState.root.queryParams.subscribe((params) => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
    this.contactForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      selectedUserCategory: [this.selectedUserCategory, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactno: [
        '+65 ',
        [Validators.required, Validators.pattern('^\\+65\\s[0-9]{8}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  enforceSingaporePrefix() {
    const contactControl = this.contactForm.get('contactno');
    if (contactControl) {
      let value = contactControl.value;
      if (!value.startsWith('+65 ')) {
        contactControl.setValue('+65 ', { emitEvent: false });
      } else {
        let digits = value.replace(/\D/g, '');
        if (digits.length > 10) {
          digits = digits.slice(0, 10);
        }
        contactControl.setValue('+65 ' + digits.slice(2), { emitEvent: false });
      }
    }
  }

  get emailf() {
    return this.contactForm.get('email');
  }

  get selectedCategoryf() {
    return this.contactForm.get('selectedUserCategory');
  }

  get name() {
    return this.contactForm.get('name');
  }

  get contactnof() {
    return this.contactForm.get('contactno');
  }

  get pass() {
    return this.contactForm.get('password');
  }

  editProduct(product: any): void {
    product.editing = true;
    this.selectedProduct = product;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([], {
      queryParams: { tab: this.activeTab },
      queryParamsHandling: 'merge',
    });
  }

  signup(): void {
    if (this.contactForm.invalid) {
      this.toastr.warning('Please fill in all required fields correctly.');
      return;
    }

    const email = this.contactForm.value.email;
    const name = this.contactForm.value.name;
    const selectedUserCategory = this.contactForm.value.selectedUserCategory;
    const contactno = this.contactForm.value.contactno;
    const password = this.contactForm.value.password;

    this.auth
      .signup(email, name, selectedUserCategory, contactno, password)
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
    this.selectedUserCategory = this.userCategories[0];
    this.username = '';
    this.contactno = '';
    this.password = '';
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeInBytes) {
        this.toastr.error(
          'File size exceeds 1 MB. Please upload a smaller image.'
        );
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
    this.Dosage = '';
    this.package = '';
    this.Indication = '';
    this.selectedCategory = this.productCategories[0];
  }

  addProduct(): void {
    if (
      this.Name &&
      this.selectedCategory &&
      this.Image &&
      this.Details &&
      this.Composition &&
      this.Dosage &&
      this.Indication
    ) {
      this.productObj.id = this.id;
      this.productObj.name = this.Name;
      this.productObj.productCategories = [this.selectedCategory];
      this.productObj.image = this.Image;
      this.productObj.details = this.Details;
      this.productObj.package = this.package;
      this.productObj.composition = this.Composition;
      this.productObj.dosage = this.Dosage;
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
    if (
      window.confirm(
        'Are you sure you want to delete this product? ' + product.name
      )
    ) {
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

  cancelEdit(product: any): void {
    product.editing = false;
  }

  preview(product: any): void {
    this.selectedProduct = product;
    this.router.navigate([`/preview/${product.id}`]);
  }
}