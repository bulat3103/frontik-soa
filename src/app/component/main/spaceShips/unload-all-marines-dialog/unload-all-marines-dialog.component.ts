import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { StarShipService } from 'src/app/services/starship.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-unload-all-marines-dialog',
  templateUrl: './unload-all-marines-dialog.component.html',
  styleUrls: ['./unload-all-marines-dialog.component.scss'],
})
export class UnloadAllMarinesDialogComponent implements OnInit {
  id: number = 0;

  constructor(
    public dialogRef: MatDialogRef<UnloadAllMarinesDialogComponent>,
    private starshipService: StarShipService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  unloadMarines() {
    this.starshipService.unloadAllMarines(this.id).subscribe((data) => {
      this.notificationService.pushSuccessNotification(
        'Unload all Mmarines',
        'status: 200'
      );
    });
    this.dialogRef.close();
  }
}
