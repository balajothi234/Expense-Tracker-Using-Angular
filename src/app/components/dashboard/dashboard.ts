import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '../../services/auth';
import { Expense } from '../../services/expense';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatIcon, MatSidenav, MatTableModule, MatPaginatorModule,
    FormsModule, MatMenuModule, MatCardModule, RouterLink,
    MatIconButton, MatSidenavModule, MatCheckboxModule, CommonModule,
    MatButtonModule, MatSidenavContainer, MatSidenavContent, MatToolbarModule, RouterOutlet
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
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
