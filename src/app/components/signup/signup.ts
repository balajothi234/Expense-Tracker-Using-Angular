import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,
     CommonModule,
     MatButtonModule,MatSnackBarModule,
    MatDividerModule,
     MatFormFieldModule,
      MatIcon,
       MatInputModule,
       RouterLink
      ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm:any;

 
  constructor(private fb: FormBuilder, private auth: Auth, private router: Router,private snackBar:MatSnackBar) {
  this.signupForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
password: [
  '',
  [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/)
  ]
],

  });
  }

  onSignup() {
    const { username, email, password } = this.signupForm.value;
    const success = this.auth.register({ username: username!, email: email!, password: password! });
    if (success) {
      // alert('Signup successful! Please login.');
      // this.router.navigate(['/login']);
              this.showSnackBar('Signup Successfull', 'success');

    } else {
      alert('Email already exists!');
    }
  }

    // Snackbar
  showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
      panelClass: [`${type}-snackbar`],
    });
  }

}
