import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ci-center-spinner',
  template: `
    <mat-spinner class="spinner" color="accent"></mat-spinner>
  `,
  styles: []
})

export class CentreSpinnerComponent {
  @HostBinding('class') overlay = 'overlay';

}
