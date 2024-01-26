import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyConverted } from '../app.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-conversion-list',
  templateUrl: './conversion-list.component.html',
  styleUrls: ['./conversion-list.component.scss']
})
export class ConversionListComponent implements OnInit, AfterViewInit, OnDestroy {
  private subcription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  @ViewChild(MatSort) sort: MatSort | undefined;

  loader: boolean = false;

  dataSource: MatTableDataSource<CurrencyConverted> | undefined;

  displayedColumns: string[] = ['from_country', 'to_country', 'from_amount', 'currency_name', 'rate', 'rate_for_amount', 'update', 'delete'];

  constructor(
    private appService: AppService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    ) {}

  ngOnInit(): void {
    this.conversionList();
  };

  ngAfterViewInit() {
    if (this.paginator && this.sort) {
      this.dataSource!.paginator = this.paginator;
      this.dataSource!.sort = this.sort;
    }
  }

  conversionList = (): void => {
    this.loader = true;
    this.subcription = this.appService.getConversionList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
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

  applyFilter = (event: Event): void => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
