import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpaceMarineService } from '../../../services/space-marine.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMarineDialogComponent } from './add-marine-dialog/add-marine-dialog.component';
import { concatMap, of, Subscription } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SortDialogComponent } from './sort-dialog/sort-dialog.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-space-marines',
  templateUrl: './space-marines.component.html',
  styleUrls: ['./space-marines.component.scss'],
})
export class SpaceMarinesComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  spaceMarines: any = [];
  pageNumber = 1;
  isLoading = false;
  sortFilters = undefined;
  filters = undefined;
  firstLoadPage = true;

  constructor(
    private spaceMarineService: SpaceMarineService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscription.add(
      this.route.params
        .pipe(
          concatMap((value) => {
            this.isLoading = true;
            this.pageNumber = +value['id'];
            if (!this.sortFilters) {
              this.sortFilters = this.spaceMarineService.loadSortFilters();
              this.spaceMarineService.setSortFilters(this.sortFilters);
            }
            if (!this.filters) {
              this.filters = this.spaceMarineService.loadFilters();
              this.spaceMarineService.setFilters(this.filters);
            }
            return this.spaceMarineService.getMarines(
              value['id'],
              this.sortFilters,
              this.filters
            );
          })
        )
        .subscribe((data) => {
          this.spaceMarines = data;
          this.notificationService.pushSuccessNotification(
            'Marines загружены',
            'status: 200'
          );
          setTimeout(() => {
            this.isLoading = false;
            this.firstLoadPage = false;
          }, 1000);
        })
    );
    this.subscription.add(
      this.spaceMarineService._isOpenAddMarineDialog$.subscribe((flag) => {
        if (flag) {
          this.onOpenAddMarineDialog();
        }
      })
    );

    this.subscription.add(
      this.spaceMarineService._sortFilters$
        .pipe(
          concatMap((filters: any) => {
            this.isLoading = true;
            if (!this.firstLoadPage) {
              this.sortFilters = filters;
              return this.spaceMarineService.getMarines(
                this.pageNumber,
                this.sortFilters,
                this.filters
              );
            }
            return of([]);
          })
        )
        .subscribe((data: any) => {
          if (data?.length || !this.firstLoadPage) {
            this.spaceMarines = data;
            this.notificationService.pushSuccessNotification(
              'Marines загружены',
              'status: 200'
            );
          }

          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        })
    );

    this.subscription.add(
      this.spaceMarineService._Filters$
        .pipe(
          concatMap((filters: any) => {
            this.isLoading = true;
            if (!this.firstLoadPage) {
              this.filters = filters;
              return this.spaceMarineService.getMarines(
                this.pageNumber,
                this.sortFilters,
                this.filters
              );
            }
            return of([]);
          })
        )
        .subscribe((data: any) => {
          if (data?.length || !this.firstLoadPage) {
            this.spaceMarines = data;
            this.notificationService.pushSuccessNotification(
              'Marines загружены',
              'status: 200'
            );
          }

          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        })
    );

    this.subscription.add(
      this.spaceMarineService._addMarine$
        .pipe(
          concatMap((_) => {
            this.isLoading = true;
            return this.spaceMarineService.getMarines(
              this.pageNumber,
              this.sortFilters,
              this.filters
            );
          })
        )
        .subscribe((data: any) => {
          this.spaceMarines = data;
          this.notificationService.pushSuccessNotification(
            'Marines загружены',
            'status: 200'
          );

          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        })
    );
  }

  checkMaxPage() {
    return !this.spaceMarines.length;
  }

  checkMinPage() {
    return this.pageNumber === this.spaceMarineService.pageMin;
  }

  onOpenAddMarineDialog() {
    const dialogRef = this.dialog.open(AddMarineDialogComponent, {
      width: '630px',
      restoreFocus: false,
      autoFocus: 'first-header',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  openSortDialog() {
    const dialogRef = this.dialog.open(SortDialogComponent, {
      width: '630px',
      restoreFocus: false,
      autoFocus: 'first-header',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '930px',
      restoreFocus: false,
      autoFocus: 'first-header',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  nextPage() {
    ++this.pageNumber;
    this.router.navigate(['/spacemarines', this.pageNumber]);
  }

  prevPage() {
    --this.pageNumber;
    this.router.navigate(['/spacemarines', this.pageNumber]);
  }

  reloadMarinesArray() {
    this.isLoading = true;
    this.spaceMarineService
      .getMarines(this.pageNumber, this.sortFilters, this.filters)
      .subscribe((data) => {
        this.spaceMarines = data;
        this.notificationService.pushSuccessNotification(
          'Marines загружены',
          'status: 200'
        );
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
