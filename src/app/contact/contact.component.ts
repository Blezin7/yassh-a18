import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false,
})
export class ContactComponent implements OnInit {
  public type: 'image' | 'audio' = 'image';
  contactForm!: FormGroup;
  captchaToken: string = '';
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  handleReset(): void {
    this.captchaToken = '';
    console.log('reCAPTCHA reset');
  }

  handleExpire(): void {
    this.captchaToken = '';
    console.log('reCAPTCHA expired');
  }

  handleLoad(): void {
    console.log('reCAPTCHA loaded');
  }

  handleSuccess(token: string): void {
    this.captchaToken = token;
    this.contactForm.patchValue({ recaptcha: token });
    console.log('reCAPTCHA successful, token:', token);
  }

  onSubmit(): void {
    if (this.contactForm.valid && this.captchaToken) {
      console.log('Form Data:', this.contactForm.value);
      this.toastr.success('Your message has been sent successfully.');
      this.contactForm.reset();
    } else {
      this.toastr.warning('Please complete the form and verify the reCAPTCHA.');
    }
  }
}
