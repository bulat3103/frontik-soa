import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMarineDialogComponent } from '../edit-marine-dialog/edit-marine-dialog.component';
import { SpaceMarineService } from 'src/app/services/space-marine.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-space-marine-card',
  templateUrl: './space-marine-card.component.html',
  styleUrls: ['./space-marine-card.component.scss'],
})
export class SpaceMarineCardComponent implements OnInit {
  @Input() marine: any;

  @Output() onEditOrDelete = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private marineService: SpaceMarineService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // console.log(this.marine)
  }

  editMarine() {
    const dialogRef = this.dialog.open(EditMarineDialogComponent, {
      width: '630px',
      restoreFocus: false,
      autoFocus: 'first-header',
      data: this.marine,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.marineService.editMarine(result.id, result).subscribe((data) => {
          this.notificationService.pushSuccessNotification(
            'Marine изменен',
            'status: 200'
          );
          this.onEditOrDelete.emit();
        });
      }
    });
  }

  deleteMarine() {
    this.marineService.deleteMarine(this.marine.id).subscribe((data) => {
      this.notificationService.pushSuccessNotification(
        'Marine удален',
        'status: 200'
      );
      this.onEditOrDelete.emit();
    });
  }
}
