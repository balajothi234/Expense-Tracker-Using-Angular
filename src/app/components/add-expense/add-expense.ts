import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { formatDate } from '@angular/common';
import { Expense } from '../../services/expense';
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
import { MatSnackBarModule,MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule,RouterModule,
    CommonModule, MatCardModule, MatDatepickerModule,MatMenuModule,
    MatButtonModule, MatSnackBarModule, MatDatepickerModule,
    MatDividerModule,MatSidenavModule,
    MatFormFieldModule,MatSelectModule,
    MatIcon,
    MatInputModule,
    CommonModule,],
     providers: [provideNativeDateAdapter()],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense implements OnInit{
expenseForm;
 isEditMode = false;
 expenseId: string | null = null;
constructor(private fb:FormBuilder,private route :ActivatedRoute,private snackBar:MatSnackBar,private expenseService:Expense,private router:Router){
 this.expenseForm=this.fb.group({
   expenseName: ['', Validators.required],
    amount: ['', Validators.required],
    date: ['', Validators.required],
    category: ['', Validators.required],
    paymentSource: ['', Validators.required],
    comment: ['']
})
}
isEdit=false;
  ngOnInit() {
    this.expenseId = this.route.snapshot.paramMap.get('id');
    if (this.expenseId) {
      this.isEditMode = true;
      const exp = this.expenseService.getAllExpense().find(e => e.id === this.expenseId);
      if (exp) this.expenseForm.patchValue(exp);
    }
  }
expense:any;
onSubmit() {
  if (this.expenseForm.valid) {
    const formValue = this.expenseForm.value;

   
    const formattedDate = formValue.date
      ? formatDate(formValue.date, 'MM/dd/yyyy', 'en-US')
      : ''; 
    this.expense = {
      id: Date.now(),
      ...formValue,
      date: formattedDate
    };

    this.expenseService.addExpense(this.expense);
   
     this.showSnackBar('Expense Added', 'success');
    this.router.navigate(['/dashboard']);
  }
    
}

 showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, '', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
      panelClass: [`${type}-snackbar`],
    });
  }
}
