import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CurrencyRates } from '../app.model';

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

  convertedForm: FormGroup | undefined;

  constructor(
    private appService: AppService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
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
        this.createConvertedForm(res);
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

  createConvertedForm = (rates: CurrencyRates): void => {
    this.convertedForm = this.formBuilder.group({
      from_country: [this.countryFrom!],
      to_country: [this.countryTo!],
      from_amount: [this.convertAmout],
      currency_name: [rates.currency_name],
      rate: [rates.rate],
      rate_for_amount: [rates.rate_for_amount],
    });
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }

}
