/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import environment from '../enviroments/enviroments';
import { Cities, Weather, WeatherByCity  } from './app.models'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getCities = (): Observable<Cities[]> => {
    return this.httpClient.get<Cities>(`${environment.apiUrl}basaltapi/cities`,
    { observe: 'response' }).pipe(
      map((res: any) => {
        return res.body;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  getWeather = (city: string): Observable<Weather[]> => {
    return this.httpClient.get<Weather>(`${environment.apiUrl}basaltapi/weather`,
    { params: { city } , observe: 'response' }).pipe(
      map((res: any) => {
        return res.body;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  postWeather = (weather: Weather): Observable<any> => {
    return this.httpClient.post<Weather>(`${environment.apiUrl}basaltapi/weatherbycity`, weather,
    { observe: 'response' }).pipe(
      map((res: any) => {
        return res.body;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  getWeatherByCity = (): Observable<WeatherByCity[]> => {
    return this.httpClient.get<WeatherByCity>(`${environment.apiUrl}basaltapi/weatherbycity`,
    { observe: 'response' }).pipe(
      map((res: any) => {
        return res.body;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  updateWeatherByCity = (id: string, city: string): Observable<WeatherByCity[]> => {
    return this.httpClient.put<WeatherByCity>(`${environment.apiUrl}basaltapi/weatherbycity`, { id, city },
    { observe: 'response' }).pipe(
      map((res: any) => {
        return res.status;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }

  deleteWeatherByCity = (id: string): Observable<WeatherByCity[]> => {
    return this.httpClient.delete<WeatherByCity>(`${environment.apiUrl}basaltapi/weatherbycity`,
    { params: { id }, observe: 'response' }).pipe(
      map((res: any) => {
        return res.status;
      }),
      catchError((err: HttpErrorResponse) => { throw new Error(err.message); }),
    )
  }
}

