import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cities, Weather  } from '../app.models'
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherListComponent } from '../Weather-list/weather-list.component';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather-by-city',
  templateUrl: './weather-by-city.component.html',
  styleUrls: ['./weather-by-city.component.scss'],
  providers: [WeatherListComponent]
})
export class WeatherByCityComponent implements OnInit, OnDestroy {
  private subcription: Subscription | undefined;

  citiesList: Cities[] | undefined;

  weatherForm: FormGroup | undefined

  loader: boolean = false;

  weatherData: boolean = false;

  constructor(
    private appService: AppService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private weatherList: WeatherListComponent,
  ) {}

  ngOnInit(): void {
    this.getCitiesList();
  }

  getCitiesList = (): void => {
    this.loader = true;
    this.subcription = this.appService.getCities().subscribe({
      next: (res) => {
        this.citiesList = res;
        if (this.citiesList.length > 0) {
          this.weatherData = true;
        }
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.loader = false;
      },
      complete: () => {
        this.loader = false;
      }
    });
  };

  getWeatherForCity = (event: MatSelectChange): void => {
    const { city } = event.value as Cities;
    this.loader = true;
    this.subcription = this.appService.getWeather(city!).subscribe({
      next: (res) => {
        this.createWeatherForm(city!, res[0]);
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.loader = false;
      },
      complete: () => {
        this.loader = false;
      }
    })
  }

  createWeatherForm = (city: string, weather: Weather): void => {
    this.weatherForm = this.formBuilder.group({
      id: [weather.id],
      city: [city],
      main: [weather.main],
      description: [weather.description],
      icon: [weather.icon]
    });
  }

  clearForm = (): void => {
    this.weatherForm?.reset();
    this.weatherData = false;
  }

  onSubmit = (): void => {
    if (this.weatherForm?.invalid) {
      this.toastr.warning('Check Form', 'WARNING', {
        timeOut: 3000,
      });
      return;
    }
    this.loader = true;
    this.subcription = this.appService.postWeather(this.weatherForm?.value).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Weather for city added', 'SUCCESS', {
            timeOut: 3000,
          });
          this.weatherForm?.reset();
          this.weatherData = false;
          this.weatherList.getWeatherByCityList();
        }
      },
      error: (err: ErrorEvent) => {
        this.toastr.error(err.message, 'ERROR', {
          timeOut: 3000,
        });
        this.loader = false;
      },
      complete: () => {
        this.loader = false;
      }
    })
  }

  

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
