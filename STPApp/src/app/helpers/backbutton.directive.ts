import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
    selector: '[appBackButton]'
})
export class BackButtonDirective {

    constructor(private location: Location) { }

    @HostListener('click', ['$event'])
    onClick(event: Event) {

        event.preventDefault();
        event.stopPropagation();

        this.location.back();
    }
}
