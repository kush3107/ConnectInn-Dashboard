import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ci-center-spinner',
  template: `        
        <div style="position: absolute;height: 100%;width: 100%;" fxLayoutAlign="center center">
            <mat-spinner color="accent"></mat-spinner>
        </div>
    `,
  styles: []
})

export class CentreSpinnerComponent {
  //
}
