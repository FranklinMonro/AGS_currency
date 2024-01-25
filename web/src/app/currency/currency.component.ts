import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit, OnDestroy  {
  private subcription: Subscription | undefined;

  loader: boolean = false;

  availableCurrenciesListFrom: object[] | undefined;

  countryFrom: string | undefined;

  availableCurrenciesListTo: object[] | undefined;

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
        this.availableCurrenciesListFrom = res;
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

  convertCurrency = (event: MatSelectChange) => {
    this.countryFrom = event.value;
    this.availableCurrenciesListTo = this.availableCurrenciesListFrom!.filter((countries) => {
      Object.keys(countries)[0] !== this.countryFrom
    });
  };

  

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

}
