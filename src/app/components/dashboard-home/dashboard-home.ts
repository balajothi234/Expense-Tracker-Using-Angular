import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Auth } from '../../services/auth';
import { Expense } from '../../services/expense';
// import * as Highcharts from 'highcharts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryChart } from '../../charts/category-chart/category-chart';
import { PaymenttypeChart } from '../../charts/paymenttype-chart/paymenttype-chart';

@Component({
  selector: 'app-dashboard-home',
    imports: [MatIcon, MatTableModule,MatPaginator,MatPaginatorModule,CategoryChart,
        FormsModule,MatMenuModule,MatCardModule,RouterLink,PaymenttypeChart,
          MatIcon, MatTableModule, MatPaginator, MatPaginatorModule,
    FormsModule, MatMenuModule, MatCardModule, RouterLink,
    MatIconButton, MatSidenavModule, MatCheckboxModule, CommonModule,
    MatButtonModule, MatToolbarModule,
     MatSidenavModule, MatCheckboxModule,CommonModule,
    MatButtonModule, MatToolbarModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome implements OnInit{
  events: string[] = [];
  //  opened: boolean;
  opened=true;
  user:any;
  users:any;  
  totalExpense = 0;
  totalCount=0;
  constructor(private auth:Auth,private expenseService:Expense,private snackBar:MatSnackBar,private router:Router){
    this.user = this.auth.getLoggedInUser();
    this.users=this.auth.getAllUsers();
  }
   expenses: Expense[] = [];

 

  ngOnInit(){
    this.expenses = this.expenseService.getAllExpense();
    this.loadExpenses();
  }
  

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  displayedColumns: string[] = [
  // 'position',
  'name',
  'amount',
  'date',
  'category',
  'paymentSource',
  'comments',
  'actions'
];
expensestable = []
 loadExpenses() {
    this.expenses = this.expenseService.getAllExpense();
    this.calculateTotal(); 
    
  }
calculateTotal() {
    this.totalExpense = this.expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
     this.totalCount = this.expenses.length;
  }
deleteExpense(id: string) {
  if (confirm('Are you sure you want to delete this expense?')) {
    this.expenseService.deleteExpense(id);
    this.loadExpenses(); 
  }
}
// const newExpense = {
//   id: Date.now().toString(),
//   ...this.expenseForm.value
// };
// this.expenseService.addExpense(newExpense);

editExpense(expense: Expense) {
  this.router.navigate(['/dashboard/add-expense'], { state: { expense } });
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
