import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SpaceMarineService } from 'src/app/services/space-marine.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-lower-achievs',
  templateUrl: './lower-achievs.component.html',
  styleUrls: ['./lower-achievs.component.scss'],
})
export class LowerAchievsComponent implements OnInit {
  achievs: string = '';

  constructor(
    private dialogRef: MatDialogRef<LowerAchievsComponent>,
    private marineSevice: SpaceMarineService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  getAchievs() {
    this.marineSevice.getLowerAchievs(this.achievs).subscribe((data: any) => {
      this.notificationService.pushSuccessNotification(data, 'Lower Achievs');
    });
    this.dialogRef.close();
  }
}
