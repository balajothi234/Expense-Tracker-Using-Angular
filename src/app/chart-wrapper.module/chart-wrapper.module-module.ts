import { NgModule } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [NgChartsModule],
  exports: [NgChartsModule,BaseChartDirective]

})
export class ChartWrapperModuleModule { }
