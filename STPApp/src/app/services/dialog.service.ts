import { Injectable } from '@angular/core';
import { DialogResult } from '../controls/standard-dialog/dialog-result';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../controls/standard-dialog/dialog-data';
import { DialogType } from '../controls/standard-dialog/dialog-type';
import { StandardDialogComponent } from '../controls/standard-dialog/standard-dialog.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  showYesNoDialog(header: string, message: string): Observable<DialogResult> {

    const dialogConfig: DialogData = {
      header,
      message,
      type: DialogType.YesNo
    };

    const dialogRef = this.dialog.open(StandardDialogComponent, {
      data: dialogConfig,
      panelClass: 'standard-dialog'
    });

    return dialogRef.afterClosed().pipe(tap(x => x as DialogResult));
  }

  showMessage(header: string, message: string): void {

    const dialogConfig: DialogData = {
      header,
      message,
      type: DialogType.Ok
    };
    const dialogRef = this.dialog.open(StandardDialogComponent, {
      data: dialogConfig,
      panelClass: 'standard-dialog'
    });
  }
}
