import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-summary',
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.scss']
})
export class ValidationSummaryComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() formErrors: [];
  @Input() submitted: boolean;

  constructor() { }

  ngOnInit() {

  }
}
