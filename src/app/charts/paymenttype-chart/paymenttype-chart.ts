import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartWrapperModuleModule } from '../../chart-wrapper.module/chart-wrapper.module-module';
import { Subscription } from 'rxjs';
import { Expense } from '../../services/expense';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartType } from 'chart.js';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@Component({
  selector: 'app-paymenttype-chart',
  imports: [CommonModule, ChartWrapperModuleModule,MatButtonToggleModule],
  templateUrl: './paymenttype-chart.html',
  styleUrl: './paymenttype-chart.css',
})
export class PaymenttypeChart {
chartType: ChartType = 'pie';
  pieChartData!: ChartData<'pie', number[], string | string[]>;
  pieChartOptions: ChartOptions<any> = {
  responsive: true,
  plugins: {
    legend: { position: 'center' },
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
    const categories = ['Credit', 'Debit', 'Cash'];
    const totals = categories.map(
      (cat) =>
        expenses
          .filter((p) => p.paymentSource === cat)
          .reduce((sum, p) => sum + Number(p.amount || 0), 0)
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
    changeType(type: ChartType) {
    this.chartType = type;
  }
}
