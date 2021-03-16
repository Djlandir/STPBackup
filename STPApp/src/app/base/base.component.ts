import { OnDestroy, HostListener, Directive, Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { SaveResult } from '../stubs/saveResult';

@Injectable()
export class BaseComponent implements OnDestroy {
    protected isActive = true;
    formErrors = [];
    private globalErrors = [];
    private formGroup: FormGroup = null;

    ngOnDestroy(): void {
        this.isActive = false;
    }

    protected setFormErrors(saveResult: SaveResult, form: FormGroup): void {

        // Validation Fehler an Controls setzen
        saveResult.validationFailures
            .filter(x => x.propertyName) // globale Fehler herausfiltern
            .forEach(v => {
                const control = form.controls[this.lowerCaseFirstLetter(v.propertyName)];
                if (control) {
                    control.setErrors({ x: v.errorMessage });
                } else {
                    throw new Error(`Das Formular hat kein Feld mit dem Namen '${this.lowerCaseFirstLetter(v.propertyName)}'`);
                }
            });

        // Globale Fehler speichern (für Validation-Summary)
        this.globalErrors = [];
        saveResult.validationFailures.filter(x => x.propertyName === '')
            .forEach(failure => this.globalErrors.push({ key: '', val: failure.errorMessage }));

        this.displayErrors();
    }

    protected registerFormErrorTracking(formGroup: FormGroup) {

        this.formGroup = formGroup;
        formGroup.valueChanges
            .pipe(takeWhile(x => this.isActive))
            .subscribe(x => {
                this.displayErrors();
            });
    }

    @HostListener('window:beforeunload')
    checkCanDeactivate(): boolean {

        if (this.formGroup && this.formGroup.dirty) {
            return false;
        } else {
            return true;
        }
    }

    private displayErrors() {

        const errorList = [];

        for (const controlKey in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(controlKey)) {
                if (this.formGroup.controls[controlKey].errors) {

                    const errors = this.formGroup.controls[controlKey].errors;
                    for (const key in errors) {
                        if (errors.hasOwnProperty(key)) {

                            // Spezialfall Datumsformat herausfiltern
                            if (key !== 'matDatepickerParse') {
                                errorList.push({ key, val: errors[key] });
                            }
                        }
                    }
                }
            }
        }

        // Globale Fehler
        if (this.globalErrors) {
            this.globalErrors.forEach(error => errorList.push(error));
        }
        this.formErrors = errorList;
    }

    private lowerCaseFirstLetter(input: string): string {
        return input.charAt(0).toLowerCase() + input.slice(1);
    }
}
