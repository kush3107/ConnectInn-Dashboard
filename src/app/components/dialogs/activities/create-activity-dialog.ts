import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getDateObj, Utils} from "../../../utils";
import {ConnectInnService} from "../../../services/connect-inn";
import {Store} from "@ngrx/store";
import {State} from "../../../reducers";
import {MatDialog} from "@angular/material";
import {AlertService} from "../../../services/alert";
import moment from "moment";

@Component({
  selector: 'ci-activity-dialog',
  template: `
    <ci-modal-layout-popup headerTitle="Create Activity" xmlns="http://www.w3.org/1999/html">
      <form fxLayout="column" fxLayoutGap="10px" (ngSubmit)="submitForm()" [formGroup]="formGroup">
        <mat-form-field class="full-width">
          <input matInput formControlName="title" placeholder="Title" type="text">
          <mat-error>Title is required and should be minimum 4 characters long</mat-error>
        </mat-form-field>
        <mat-form-field class="full-width">
          <textarea matInput style="max-height: 100px" placeholder="Description"
                    formControlName="description"></textarea>
        </mat-form-field>
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <mat-form-field class="half-width">
            <input matInput formControlName="start" [max]="end.value" [matDatepicker]="startDatepicker" placeholder="Start Date">
            <mat-datepicker-toggle matSuffix [for]="startDatepicker"></mat-datepicker-toggle>
            <mat-datepicker #startDatepicker></mat-datepicker>
            <mat-error>Start Date is required</mat-error>
          </mat-form-field>
          <mat-form-field class="half-width">
            <input matInput formControlName="end" [min]="start.value" [matDatepicker]="endDatepicker" placeholder="End Date">
            <mat-datepicker-toggle matSuffix [for]="endDatepicker"></mat-datepicker-toggle>
            <mat-datepicker #endDatepicker></mat-datepicker>
          </mat-form-field>
        </div>
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <mat-form-field class="half-width">
            <mat-select placeholder="Type" formControlName="type">
              <mat-option *ngFor="let type of activityTypes" [value]="type.slug">
                {{ type.displayValue }}
              </mat-option>
            </mat-select>
            <mat-error>Please select a type</mat-error>
          </mat-form-field>
          <mat-form-field class="half-width">
            <input matInput formControlName="link" placeholder="Link" type="text">
          </mat-form-field>
        </div>
        <div fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="15px">
          <mat-spinner *ngIf="isSaving" [diameter]="30" [strokeWidth]="4"></mat-spinner>
          <button type="submit" color="accent" [disabled]="isSaving" mat-raised-button>Create</button>
        </div>
      </form>
    </ci-modal-layout-popup>
  `, styles: [`
    .full-width {
      width: 100%;
    }
    
    .half-width {
      width: 48%;
    }
  `]
})

export class CreateActivityDialogComponent implements OnInit {
  formGroup: FormGroup;

  activityTypes;

  isSaving = false;

  title: FormControl;
  description: FormControl;
  link: FormControl;
  start: FormControl;
  end: FormControl;
  type: FormControl;

  constructor(private service: ConnectInnService, private dialog: MatDialog, private alertService: AlertService) {

  }

  ngOnInit() {
    this.activityTypes = Utils.getAllActivityTypes();

    this.title = new FormControl(null, [Validators.required, Validators.minLength(4)]);
    this.description = new FormControl();
    this.link = new FormControl();
    this.start = new FormControl(null, [Validators.required]);
    this.end = new FormControl();
    this.type = new FormControl(null, [Validators.required]);

    this.formGroup = new FormGroup({
      title: this.title,
      description: this.description,
      start: this.start,
      end: this.end,
      link: this.link,
      type: this.type
    });
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }

    this.start.setValue(Utils.getDateInFormat(getDateObj(this.start.value)));
    this.end.setValue(Utils.getDateInFormat(getDateObj(this.end.value)));
    const data = this.formGroup.getRawValue();
    console.log(data);
    this.isSaving = true;
    this.service.createActivity(data).subscribe(activity => {
      this.isSaving = false;
      this.dialog.closeAll();
    }, err => {
      this.isSaving = false;
      this.alertService.error(err);
    });
  }
}
