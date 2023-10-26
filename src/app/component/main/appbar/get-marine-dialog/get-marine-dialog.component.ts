import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-marine-dialog',
  templateUrl: './get-marine-dialog.component.html',
  styleUrls: ['./get-marine-dialog.component.scss'],
})
export class GetMarineDialogComponent implements OnInit {
  marineId: number = 0;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<GetMarineDialogComponent>
  ) {}

  ngOnInit() {}

  getMarine() {
    this.router.navigate(['solo', this.marineId]);
    this.dialogRef.close();
  }
}
