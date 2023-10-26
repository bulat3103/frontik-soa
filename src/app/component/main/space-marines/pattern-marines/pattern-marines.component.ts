import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { SpaceMarineService } from 'src/app/services/space-marine.service';

@Component({
  selector: 'app-pattern-marines',
  templateUrl: './pattern-marines.component.html',
  styleUrls: ['./pattern-marines.component.scss'],
})
export class PatternMarinesComponent implements OnInit {
  marines: any;
  isLoading = false;
  patternParams: any;

  constructor(
    private spaceMarinesService: SpaceMarineService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.spaceMarinesService._patternMarine$.subscribe((pattern) => {
      this.patternParams = pattern;
      if (!Object.values(pattern).length) {
        const localStoragePattern = localStorage.getItem('pattern');
        if (localStoragePattern) {
          this.patternParams = JSON.parse(localStoragePattern);
        }
      }
      console.log(this.patternParams);
      this.reloadMarinesArray();
    });
  }

  reloadMarinesArray() {
    this.isLoading = true;
    this.spaceMarinesService
      .getPatternMarine(this.patternParams)
      .subscribe((data) => {
        this.marines = data;
        this.notificationService.pushSuccessNotification(
          'Marines загружены',
          'status: 200'
        );
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      });
  }
}
