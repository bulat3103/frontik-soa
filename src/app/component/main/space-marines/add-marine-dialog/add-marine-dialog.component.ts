import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { SpaceMarineService } from 'src/app/services/space-marine.service';

@Component({
  selector: 'app-add-marine-dialog',
  templateUrl: './add-marine-dialog.component.html',
  styleUrls: ['./add-marine-dialog.component.scss'],
})
export class AddMarineDialogComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    x: [null, Validators.required],
    y: [null, [Validators.required]],
    health: [null, [Validators.min(0), Validators.required]],
    heartCount: [null, [Validators.min(0), Validators.required]],
    achievements: [null],
    category: ['', Validators.required],
    chapterName: ['', Validators.required],
    chapterMarinesCount: [null, [Validators.min(0), Validators.required]],
    starshipId: [null],
  });

  arr = ['AGGRESSOR', 'ASSAULT', 'INCEPTOR', 'TERMINATOR'];

  isStarshipNull = new FormControl(false);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMarineDialogComponent>,
    private marineService: SpaceMarineService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  addMarine() {
    if (this.form.valid) {
      const resObj = this.form.value;
      if (resObj && this.isStarshipNull.value) {
        resObj['starshipId'] = null;
      }
      this.marineService.addNewMarine(resObj).subscribe((data) => {
        this.notificationService.pushSuccessNotification('Marine добавлен', '');
        this.marineService.setAddMarine();
      });
      this.dialogRef.close();
    } else {
      this.notificationService.pushWarningNotification(
        `Заполните все поля формы, необязательные 'achievements', 'starshipId'`,
        ''
      );
    }
  }
}
