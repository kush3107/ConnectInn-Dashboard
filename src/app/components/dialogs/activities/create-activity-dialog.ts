import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'ci-activity-dialog',
  template: `
    <mat-dialog-content>
      <div fxLayout="column" fxLayoutGap="20px">
        <form fxLayoutGap="10px" [formGroup]="formGroup">
          <mat-form-field style="width: 80%">
            <input matInput formControlName="title" placeholder="Title" type="text">
            <mat-error>Title is required</mat-error>
          </mat-form-field>
          <mat-form-field>
            <textarea matInput placeholder="Description" formControlName="description"></textarea>
          </mat-form-field>
        </form>
      </div>
    </mat-dialog-content>
  `,
  styles: []
})

export class CreateActivityDialogComponent implements OnInit{
  formGroup: FormGroup;

  title: FormControl;
  description: FormControl;

  constructor() {

  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    });
  }
}
