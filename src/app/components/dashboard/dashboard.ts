import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Signal } from '@angular/core';
import { signal } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { Inject } from '@angular/core';
import { inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '../../services/auth';
import { Settings } from '../settings/settings';
import { AddExpense } from '../add-expense/add-expense';
import { Expense } from '../../services/expense';
import { CommonModule } from '@angular/common';
import { DashboardHome } from '../dashboard-home/dashboard-home';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryChart } from '../../charts/category-chart/category-chart';
@Component({
  selector: 'app-dashboard',
  imports: [
    MatIcon, MatSidenav, MatTableModule, MatPaginator, MatPaginatorModule,DashboardHome,
    FormsModule, MatMenuModule, Settings, AddExpense, MatCardModule, RouterLink,CategoryChart,
    MatIconButton, MatSidenavModule, MatNavList, MatCheckboxModule, CommonModule,
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
