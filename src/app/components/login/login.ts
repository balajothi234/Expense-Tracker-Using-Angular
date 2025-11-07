import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule,
    MatDividerModule, MatFormFieldModule, MatIcon, MatInputModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
message='';
loginForm:any;
constructor(private fb:FormBuilder,private auth:Auth,private router:Router){
this.loginForm=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',Validators.required]
})
}
onLogin(){
  const {email,password}=this.loginForm.value;
  if(this.auth.login(email!,password!)){
    this.router.navigate(['/dashboard']);
    this.loginForm.reset();
  }else{
    this.message='Invaild username or password';
    this.loginForm.reset();
  }
}
}
