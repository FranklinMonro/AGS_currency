/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import environment from '../enviroments/enviroments';
import { CurrencyRates, CurrencyConverted } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getCurrecies = (): Observable<object> => {
    return this.httpClient.get<object>(`${environment.apiUrl}asgapi/currency/currency`,
    { observe: 'response' }).pipe(
      map((res: any) => {
        return res.body;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  getCurrenciesConvert = (convertAmout: string, countryFrom: string, countryTo: string): Observable<CurrencyRates> => {
    return this.httpClient.get<CurrencyRates>(`${environment.apiUrl}asgapi/currency/convert`,
    { params: { convertAmout, countryFrom, countryTo } , observe: 'response' }).pipe(
      map((res: any) => {
        return res.body;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  postConversion = (convertion: CurrencyConverted): Observable<any> => {
    return this.httpClient.post<CurrencyConverted>(`${environment.apiUrl}asgapi/conversions`, convertion,
    { observe: 'response' }).pipe(
      map((res: any) => {
        return res.body;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  getConversionList = (): Observable<CurrencyConverted[]> => {
    return this.httpClient.get<CurrencyConverted>(`${environment.apiUrl}asgapi/conversions`,
    { observe: 'response' }).pipe(
      map((res: any) => {
        return res.body;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  // updateWeatherByCity = (id: string, city: string): Observable<WeatherByCity[]> => {
  //   return this.httpClient.put<WeatherByCity>(`${environment.apiUrl}basaltapi/weatherbycity`, { id, city },
  //   { observe: 'response' }).pipe(
  //     map((res: any) => {
  //       return res.status;
  //     }),
  //     catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  //   )
  // }

  // deleteWeatherByCity = (id: string): Observable<WeatherByCity[]> => {
  //   return this.httpClient.delete<WeatherByCity>(`${environment.apiUrl}basaltapi/weatherbycity`,
  //   { params: { id }, observe: 'response' }).pipe(
  //     map((res: any) => {
  //       return res.status;
  //     }),
  //     catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
  //   )
  // }
}

