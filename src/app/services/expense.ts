import { Injectable } from '@angular/core';
export interface Expense{
  id:string;
    expenseName:string;
  amount:string;
    date:string;
    category:string;
    paymentSource:string;
    comment:string

}
@Injectable({
  providedIn: 'root',
})
export class Expense {
  private expense: Expense[] = [];
  private key='expenses';

  getAllExpense():Expense[]{
    return JSON.parse(localStorage.getItem(this.key)||'[]')
  }
  addExpense(expense:Expense){
    const expenses=this.getAllExpense();
    expenses.push(expense);
    localStorage.setItem(this.key,JSON.stringify(expenses))
  }
    clearExpenses() {
    localStorage.removeItem(this.key);
  }
    getTotal(amount:any) {
    return this.expense
      .filter(a => a.amount === amount)
      .reduce((sum:any, a) => sum + a.amount, 0);
  }

  }
  

