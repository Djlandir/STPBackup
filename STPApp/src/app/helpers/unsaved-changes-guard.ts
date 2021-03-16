import { Observable } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { DialogResult } from '../controls/standard-dialog/dialog-result';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanDeactivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

export interface CheckHasChanges {
    checkCanDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<CheckHasChanges> {
    constructor(private dialogService: DialogService, private router: Router, private location: Location) {

    }

    canDeactivate(
        component: CheckHasChanges,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot): boolean | Observable<boolean> {

        return component.checkCanDeactivate()
            ? true
            : this.dialogService.showYesNoDialog('Sie haben ungespeicherte Änderungen.', 'Sollen die Änderungen verworfen werden?')
                .pipe(map(result => result === DialogResult.Yes), tap(result => {

                    // Workaround für Angular Bug! -> Wenn die Navigation hier abgebrochen wird, wurde die Browser History bereits geändert
                    // Die aktuelle Route wird deshalb hier wieder hinzugefügt
                    // https://github.com/angular/angular/issues/13586
                    if (!result && this.router.getCurrentNavigation().trigger === 'popstate') {
                        this.location.go(currentState.url);
                    }
                }));

    }
}
