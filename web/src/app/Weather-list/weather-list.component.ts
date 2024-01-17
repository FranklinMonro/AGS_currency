import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { WeatherByCity } from '../app.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @ViewChild(MatSort) sort: MatSort | undefined;
  
  private subcription: Subscription | undefined;

  dataSource: MatTableDataSource<WeatherByCity> | undefined;
  
  displayedColumns: string[] = ['id', 'city', 'main', 'description', 'update', 'delete'];

  loader: boolean = false;
  
  constructor(
    private appService: AppService,
    private toastr: ToastrService,
  ) {
    this.getWeatherByCityList();
  }

  ngOnInit(): void {
    this.getWeatherByCityList();
  }

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource!.paginator = this.paginator;
      this.dataSource!.sort = this.sort;
    }
  }

  getWeatherByCityList = (): void => {
    this.loader = true;
    this.subcription = this.appService.getWeatherByCity().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
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
  }

  applyFilter = (event: Event): void => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }

  updateWeather = (id: string, city: string): void => {
    this.loader = true;
    this.subcription = this.appService.updateWeatherByCity(id!, city!).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.getWeatherByCityList();
          this.toastr.success('Updated Weather', 'SUCCESS');
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
  }

  deleteWeather = (id: string): void => {
    this.loader = true;
    this.subcription = this.appService.deleteWeatherByCity(id!).subscribe({
      next: (res) => {
        if (res) {
          this.getWeatherByCityList();
          this.toastr.success('Deleted Weather', 'SUCCESS');
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
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
