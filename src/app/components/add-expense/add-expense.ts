import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { formatDate } from '@angular/common';
import { Expense } from '../../services/expense';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { Dashboard } from '../dashboard/dashboard';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule,RouterModule,
    CommonModule, MatCardModule, MatDatepickerModule,MatMenuModule,
    MatButtonModule, MatSnackBarModule, MatDatepickerModule,
    MatDividerModule,MatSidenavModule,
    MatFormFieldModule,MatSelectModule,MatMenu,
    MatIcon,
    MatInputModule,
    CommonModule,],
     providers: [provideNativeDateAdapter()],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense {
expenseForm;
constructor(private fb:FormBuilder,private expenseService:Expense,private router:Router){
 this.expenseForm=this.fb.group({
   expenseName: ['', Validators.required],
    amount: [0, Validators.required],
    date: [new Date(), Validators.required],
    category: ['', Validators.required],
    paymentSource: ['', Validators.required],
    comment: ['']
})
}
expense:any;
onSubmit() {
  if (this.expenseForm.valid) {
    const formValue = this.expenseForm.value;

    // Check if date exists and is valid
    const formattedDate = formValue.date
      ? formatDate(formValue.date, 'MM/dd/yyyy', 'en-US')
      : ''; // fallback empty if date missing

    this.expense = {
      id: Date.now(),
      ...formValue,
      date: formattedDate
    };

    this.expenseService.addExpense(this.expense);
    alert('Expense added successfully!');
    this.router.navigate(['/dashboard']);
  }
}
//  onSubmit() {
//     if (this.expenseForm.valid) {
//        this.expense = {
//         id: Date.now(),
//         ...this.expenseForm.value
//       };
//       this.expenseService.addExpense(this.expense);
//       alert('Expense added successfully!');
//       this.router.navigate(['/dashboard']);
//     }
//   }
}
