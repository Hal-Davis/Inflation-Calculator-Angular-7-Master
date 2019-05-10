import { Component,  EventEmitter, Input, OnInit, Output, NgModule } from '@angular/core';
import { InflationService } from '../services/inflation.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  public StartYear: number;
  public EndYear: number;
  public WageOrPrice: number;
  public CalculatedWageorPrice: number;
  public CalculationText; string;
  constructor(
    private inflationService: InflationService
  ) { }

  ngOnInit() {
  }
  getwageorpriceEvent() {
     this.getQuote();
  }
  formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      const negativeSign = amount < 0 ? '-' : '';
      // tslint:disable-next-line:radix
      const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount));
      const j = (i.toString().length > 3) ? i.toString().length % 3 : 0;

      return negativeSign + (j ? i.toString().substr(0, j) + thousands : '') +
      i.toString().substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)
      + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
    } catch (e) {
      console.log(e);
    }
  }

  public getQuote() {
    const QuoteObservable = this.inflationService.getInfltion( this.StartYear.toString(),
    this.EndYear.toString(),
    this.WageOrPrice.toString() );
    QuoteObservable.subscribe((calculatedWageOrPrice: number) => {
      console.log(calculatedWageOrPrice);
      if ( this.StartYear >  this.EndYear ) {
        console.log('start is greater then end');
        this.CalculationText = 'if you made ' + this.formatMoney(this.WageOrPrice).toString() + ' USD in ' + this.StartYear
        +  ' it be like making ' + this.formatMoney(calculatedWageOrPrice) + ' USD ' + ' in ' +  this.EndYear;
      } else {
        console.log('end is greater then start');
        this.CalculationText = 'if you made ' + this.formatMoney(this.WageOrPrice).toString() +  ' USD in ' + this.StartYear
        + ' in ' +  this.EndYear + ' it would be worth ' +   this.formatMoney(calculatedWageOrPrice)  + ' USD ';
      }
    });
  }
}
