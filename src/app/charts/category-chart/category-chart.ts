import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import {  Expense } from '../../services/expense';
import { ChartWrapperModuleModule } from '../../chart-wrapper.module/chart-wrapper.module-module';
@Component({
  selector: 'app-category-chart',
  standalone: true,
  imports: [CommonModule, ChartWrapperModuleModule],
  templateUrl: './category-chart.html',
})
export class CategoryChart implements OnInit, OnDestroy {
pieChartType: 'pie' = 'pie';
  pieChartData!: ChartData<'pie', number[], string | string[]>;
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: '' },
    },
  };

  private sub!: Subscription;

  constructor(private expenseService: Expense) {}

  ngOnInit() {
    this.sub = this.expenseService.expenses$.subscribe((expenses) => {
      this.updateChart(expenses);
    });

    // initialize with current data
    this.updateChart(this.expenseService.getAllExpense());
  }

  updateChart(expenses: Expense[]) {
    const categories = ['Groceries', 'Transport', 'Food', 'Other'];
    const totals = categories.map(
      (cat) =>
        expenses
          .filter((e) => e.category === cat)
          .reduce((sum, e) => sum + Number(e.amount || 0), 0)
    );

    this.pieChartData = {
      labels: categories,
      datasets: [
        {
          label: '',
          data: totals,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'],
        },
      ],
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
