import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from 'src/app/services/notification.service';
import {SpaceMarineService} from 'src/app/services/space-marine.service';
import {StarShipService} from 'src/app/services/starship.service';

@Component({
  selector: 'app-starship-create-dialog',
  templateUrl: './starship-create-dialog.component.html',
  styleUrls: ['./starship-create-dialog.component.scss'],
})
export class StarshipCreateDialogComponent implements OnInit {
  form = this.fb.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    x: [0],
    y: [0],
    crewCount: [0, Validators.min(0)],
    health: [100, Validators.min(0)],
    country: ['USA', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StarshipCreateDialogComponent>,
    private starshipService: StarShipService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
  }

  createShip() {
    this.starshipService
      .createSpaceShip(
        this.form.value,
        this.form.value.name as string,
        this.form.value.id as number
      )
      .subscribe((data) => {
        this.notificationService.pushSuccessNotification(
          'StarShip добавлен',
          'status: 200'
        );
      });
    this.dialogRef.close();
  }
}
