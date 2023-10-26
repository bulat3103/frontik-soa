import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SpaceMarineService} from 'src/app/services/space-marine.service';

export interface filterControlInterface {
  name: FormControl<string | null>;
  filter: FormControl<string | null>;
  value: FormControl<string | null>;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent implements OnInit {
  filterArray: filterControlInterface[] = [];

  fieldsNames: string[] = [
    'id',
    'name',
    'health',
    'heartCount',
    'achievements',
    'category',
    'chapterName',
    'chapterMarinesCount',
    'starship',
    'starshipName',
    'starshipCoordinateX',
    'starshipCoordinateY',
    'starshipCrewCount',
    'starshipHealth'
  ];
  filter: string[] = ['eq', 'ne', 'gt', 'lt', 'lte', 'gte'];

  constructor(
    private marineService: SpaceMarineService,
    private dialogRef: MatDialogRef<FilterDialogComponent>
  ) {
  }

  ngOnInit(): void {
    const filters = this.marineService.loadFilters();
    filters.forEach((item: any) => {
      const bufObj = {
        name: new FormControl(item.name),
        filter: new FormControl(item.filter),
        value: new FormControl(item.value),
      };

      this.filterArray.push(bufObj);
    });
  }

  addSortControl() {
    const bufObj = {
      name: new FormControl('id'),
      filter: new FormControl('eq'),
      value: new FormControl(''),
    };

    this.filterArray.push(bufObj);
  }

  deleteSortControl(index: number) {
    this.filterArray = this.filterArray.filter(
      (_: any, i: number) => index !== i
    );
  }

  saveSortParams() {
    const resultArray = this.filterArray.map((item: filterControlInterface) => {
      return {
        name: item.name.value,
        filter: item.filter.value,
        value: item.value.value,
      };
    });
    this.marineService.setFilters(resultArray);
    this.marineService.saveFilters(resultArray);
    this.dialogRef.close();
  }
}
