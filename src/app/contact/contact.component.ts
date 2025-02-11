import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

interface ContactForm{
  name: string;
  email: string;
  subject: string;
  message: string;
}

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
    this.contactForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }
  get email(){
    return this.contactForm.get('email')
  }
  get name(){
    return this.contactForm.get('name')
  }
  get subject(){
    return this.contactForm.get('subject')
  }
  get message(){
    return this.contactForm.get('message')
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
      emailjs.send('service_sdfj9go', 'template_pn3fdzd', this.contactForm.value, {publicKey:'bHoLo4cZ0_Hv_CKGK'})
      this.toastr.success('Your message has been sent successfully.');
      this.contactForm.reset();
    } else {
      this.toastr.warning('Please complete the form and verify the reCAPTCHA.');
    }
  }
}
