import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit, OnDestroy  {
  private subcription: Subscription | undefined;

  loader: boolean = false;

  availableCurrenciesList: object | undefined;

  countryFrom: string | undefined;

  countryTo: string | undefined;

  convertAmout: string | undefined;

  constructor(
    private appService: AppService,
    private toastr: ToastrService,
    ) {}

  
  ngOnInit(): void {
    this.availableCurrencies();
  };

  availableCurrencies = (): void => {
    this.loader = true;
    this.subcription = this.appService.getCurrecies().subscribe({
      next: (res) => {
        this.availableCurrenciesList = res;
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.loader = false
      },
      complete: () => {
        this.loader = false
      }
    });
  };

  getConvertedAmount = (event: Event): void => {
    this.convertAmout = (event.target as HTMLInputElement).value;
    this.loader = true;
    this.subcription = this.appService.getCurrenciesConvert(this.convertAmout, this.countryFrom!, this.countryTo!).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.loader = false
      },
      complete: () => {
        this.loader = false
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

}
