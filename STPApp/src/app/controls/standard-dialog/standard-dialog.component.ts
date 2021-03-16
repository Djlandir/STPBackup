import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data';
import { DialogType } from './dialog-type';
import { DialogResult } from './dialog-result';

@Component({
  selector: 'app-standard-dialog',
  templateUrl: './standard-dialog.component.html',
  styleUrls: ['./standard-dialog.component.scss']
})
export class StandardDialogComponent extends BaseComponent implements OnInit {

  dialogType = DialogType;
  escapeKey = 'Escape';

  constructor(
    public dialogRef: MatDialogRef<StandardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    super();
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === this.escapeKey) {
      this.dialogRef.close(DialogResult.Cancel);
    }
  }

  onYesClick(): void {
    this.dialogRef.close(DialogResult.Yes);
  }

  onNoClick(): void {
    this.dialogRef.close(DialogResult.No);
  }

  onOkClick(): void {
    this.dialogRef.close(DialogResult.Ok);
  }

  onCancelClick(): void {
    this.dialogRef.close(DialogResult.Cancel);
  }
}
