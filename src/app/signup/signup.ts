import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup,  FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  public builder = inject(FormBuilder);

  

  signupForm = this.builder.group({
    first_name: ['', [Validators.required, Validators.minLength(5)]],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
  })

  register() {
    console.log(this.signupForm.get('first_name')?.errors);
    
  }
}
