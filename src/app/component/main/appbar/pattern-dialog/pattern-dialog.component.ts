import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SpaceMarineService} from 'src/app/services/space-marine.service';

@Component({
  selector: 'app-pattern-dialog',
  templateUrl: './pattern-dialog.component.html',
  styleUrls: ['./pattern-dialog.component.scss'],
})
export class PatternDialogComponent implements OnInit {
  form = this.fb.group({
    field: [''],
    value: [''],
  });

  arr = ['name', 'achievements'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PatternDialogComponent>,
    private marineService: SpaceMarineService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  getMarines() {
    this.marineService.setPatternMarine(this.form.value);
    localStorage.setItem('pattern', JSON.stringify(this.form.value));
    this.router.navigate(['pattern']);
    this.dialogRef.close();
  }
}
