import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SpaceMarineService} from 'src/app/services/space-marine.service';

export interface sortControlInterface {
  name: FormControl<string | null>;
  sortDirection: FormControl<string | null>;
}

@Component({
  selector: 'app-sort-dialog',
  templateUrl: './sort-dialog.component.html',
  styleUrls: ['./sort-dialog.component.scss'],
})
export class SortDialogComponent implements OnInit {
  sortArray: sortControlInterface[] = [];

  fieldsNames: string[] = [
    'id',
    'name',
    'creationDate',
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
  sortDirections: string[] = ['ASC', 'DESC'];

  constructor(
    private marineService: SpaceMarineService,
    private dialogRef: MatDialogRef<SortDialogComponent>
  ) {
  }

  ngOnInit(): void {
    const sort_filters = this.marineService.loadSortFilters();
    sort_filters.forEach((item: any) => {
      const bufObj = {
        name: new FormControl(item.name),
        sortDirection: new FormControl(item.sortDirection),
      };

      this.sortArray.push(bufObj);
    });
  }

  addSortControl() {
    const bufObj = {
      name: new FormControl('id'),
      sortDirection: new FormControl('ASC'),
    };

    this.sortArray.push(bufObj);
  }

  deleteSortControl(index: number) {
    this.sortArray = this.sortArray.filter((_: any, i: number) => index !== i);
  }

  saveSortParams() {
    const resultArray = this.sortArray.map((item: sortControlInterface) => {
      return {
        name: item.name.value,
        sortDirection: item.sortDirection.value,
      };
    });

    this.marineService.setSortFilters(resultArray);
    this.marineService.saveSortFilters(resultArray);
    this.dialogRef.close();
  }
}
