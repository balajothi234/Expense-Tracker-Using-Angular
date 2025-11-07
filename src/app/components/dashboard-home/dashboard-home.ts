import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Settings } from '../settings/settings';
import { MatNavList } from '@angular/material/list';
import { AddExpense } from '../add-expense/add-expense';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Auth } from '../../services/auth';
import { Expense } from '../../services/expense';

@Component({
  selector: 'app-dashboard-home',
    imports: [MatIcon, MatSidenav,MatTableModule,MatPaginator,MatPaginatorModule,
        FormsModule,MatMenuModule,Settings,AddExpense,MatCardModule,RouterLink,
    MatIconButton, MatSidenavModule, MatNavList, MatCheckboxModule,CommonModule,
    MatButtonModule, MatSidenavContainer, MatSidenavContent, MatToolbarModule],
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
  constructor(private auth:Auth,private expenseService:Expense,private router:Router){
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
  'position',
  'name',
  'amount',
  'date',
  'category',
  'paymentSource',
  'comments'
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
}
