import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { SpaceMarineService } from '../../../../services/space-marine.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-space-marine-solo',
  templateUrl: './space-marine-solo.component.html',
  styleUrls: ['./space-marine-solo.component.scss'],
})
export class SpaceMarineSoloComponent implements OnInit {
  marine: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private spaceMarineService: SpaceMarineService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        concatMap((value) => {
          return this.spaceMarineService.getMarineById(value['id']);
        })
      )
      .subscribe((data) => {
        this.marine = data;
        this.notificationService.pushSuccessNotification(
          'Marine загружен',
          'status: 200'
        );
      });
  }
}
