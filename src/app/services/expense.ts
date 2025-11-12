


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private key = 'expenses';
  private _expenses$ = new BehaviorSubject<Expense[]>(this.getAllExpense());
  public expenses$ = this._expenses$.asObservable();

  //getting expense from localstorage
  getAllExpense(): Expense[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  // add new expense
  addExpense(expense: Expense) {
    const expenses = this.getAllExpense();
    expenses.push(expense);
    localStorage.setItem(this.key, JSON.stringify(expenses));
    this._expenses$.next(expenses);
  }

  // Delete expense
  deleteExpense(id: string) {
    const expenses = this.getAllExpense().filter((e) => e.id !== id);
    localStorage.setItem(this.key, JSON.stringify(expenses));
    this._expenses$.next(expenses); // notify subscribers
  }

  // Update expense
  updateExpense(updated: Expense) {
    const expenses = this.getAllExpense().map((exp) =>
      exp.id === updated.id ? updated : exp
    );
    localStorage.setItem(this.key, JSON.stringify(expenses));
    this._expenses$.next(expenses); 
  }

  // Clear all
  clearExpenses() {
    localStorage.removeItem(this.key);
    this._expenses$.next([]); 
  }


  }
  

