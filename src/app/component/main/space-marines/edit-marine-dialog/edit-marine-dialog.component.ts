import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-marine-dialog',
  templateUrl: './edit-marine-dialog.component.html',
  styleUrls: ['./edit-marine-dialog.component.scss'],
})
export class EditMarineDialogComponent implements OnInit {
  form = this.fb.group({
    name: [this.data.name, Validators.required],
    x: [this.data.coordinates.x, Validators.required],
    y: [this.data.coordinates.y, Validators.required],
    health: [this.data.health, [Validators.min(0), Validators.required]],
    heartCount: [
      this.data.heartCount,
      [Validators.min(0), Validators.required],
    ],
    achievements: [this.data.achievements],
    category: [this.data.category, Validators.required],
    chapterName: [this.data.chapter.name, Validators.required],
    chapterMarinesCount: [
      this.data.chapter.marinesCount,
      [Validators.min(1), Validators.required],
    ],
    starshipId: [this.data.starShip ? this.data.starShip.id : null],
  });

  isStarshipNull = new FormControl(false);

  arr = ['AGGRESSOR', 'ASSAULT', 'INCEPTOR', 'TERMINATOR'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditMarineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
  }

  editMarine() {
    if (this.form.valid) {
      const result = {
        id: this.data.id,
        ...this.form.value,
      };
      if (this.isStarshipNull.value) {
        result['starshipId'] = null;
      }
      this.dialogRef.close(result);
    } else {
      this.notificationService.pushWarningNotification(
        `Заполните все поля формы, необязательные 'achievements', 'starshipId'`,
        ''
      );
    }
  }
}
