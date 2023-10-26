import { Component } from '@angular/core';
import { SpaceMarineService } from '../../../services/space-marine.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMarineDialogComponent } from '../space-marines/add-marine-dialog/add-marine-dialog.component';
import { GetMarineDialogComponent } from './get-marine-dialog/get-marine-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LowerAchievsComponent } from './lower-achievs/lower-achievs.component';
import { StarshipCreateDialogComponent } from '../spaceShips/starship-create-dialog/starship-create-dialog.component';
import { UnloadAllMarinesDialogComponent } from '../spaceShips/unload-all-marines-dialog/unload-all-marines-dialog.component';
import { PatternDialogComponent } from './pattern-dialog/pattern-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
})
export class AppbarComponent {
  constructor(
    private spaceMarineService: SpaceMarineService,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  openGetMarineByIdDialog() {
    const dialogRef = this.dialog.open(GetMarineDialogComponent, {
      width: '630px',
      restoreFocus: false,
      autoFocus: 'first-header',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  openLowerAchievs() {
    const dialogRef = this.dialog.open(LowerAchievsComponent, {
      width: '630px',
      restoreFocus: false,
      autoFocus: 'first-header',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  getUniqueValueHeartCnt() {
    this.spaceMarineService.getUniqueValueHeartCnt().subscribe((data: any) => {
      this.notificationService.pushSuccessNotification(
        data,
        'Get Unique Value'
      );
    });
  }

  actionBlockClick($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  openAddMarineDialog() {
    this.spaceMarineService.setIsOpenAddMarineDialog(true);
  }

  checkSpaceMarineRoute() {
    return this.router.url.includes('spacemarines');
  }

  redirectToFirstPage() {
    this.router.navigate(['spacemarines', 1]);
  }

  openCreateStarShipDialog() {
    const dialogRef = this.dialog.open(StarshipCreateDialogComponent, {
      width: '630px',
      restoreFocus: false,
      autoFocus: 'first-header',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  openPatternDialog() {
    const dialogRef = this.dialog.open(PatternDialogComponent, {
      width: '630px',
      restoreFocus: false,
      autoFocus: 'first-header',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  openUnloadMarinesFromShipDialog() {
    const dialogRef = this.dialog.open(UnloadAllMarinesDialogComponent, {
      width: '630px',
      restoreFocus: false,
      autoFocus: 'first-header',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }
}
