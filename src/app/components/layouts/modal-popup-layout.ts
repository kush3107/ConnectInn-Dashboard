import {Component, DoCheck, EventEmitter, Input, Output} from "@angular/core";
import {isNullOrUndefined} from "util";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'ci-modal-layout-popup',
  template: `
  <div id="cwidth" fxLayout="column" fxLayoutGap="20px">
      <mat-dialog-content>
        <mat-toolbar style="position: fixed;z-index: 9;" [ngStyle]="{'width':clientWidth + 'px'}" color="primary">
          <h2>{{headerTitle}}</h2>
          <span class="example-spacer"></span>
          <button *ngIf="allowClose" mat-icon-button matDialogClose>
            <mat-icon>close</mat-icon>
          </button>
        </mat-toolbar>

      </mat-dialog-content>
      <div style="padding-top:40px"></div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
  .example-spacer {
      flex: 1 1 auto;
    }

    mat-dialog-content {
      padding: 0px;
    }

    /deep/ mat-dialog-container {
      padding-top: 0px !important;
      /*padding-left: 24px !important;*/
      /*padding-right: 24px !important;*/
      /*padding-bottom: 24px !important;*/
    }
  `]
})

export class ModalPopupLayoutComponent implements DoCheck {
  @Input() headerTitle: string;
  @Input() allowClose = true;
  clientWidth: number;

  constructor(private dialog: MatDialog) {
  }

  ngDoCheck() {
    if (!isNullOrUndefined(document.getElementById('cwidth'))) {
      this.clientWidth = document.getElementById('cwidth').offsetWidth + 48;
    }
  }
}
