import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConnectInnService} from "../../services/connect-inn";
import {MatDialog} from "@angular/material";
import {getDateObj, Utils} from "../../utils";

@Component({
  selector: 'ci-experience-popup',
  template: `
    <ci-modal-layout-popup headerTitle="{{headerTitle}}">
      <form fxLayout="column" fxLayoutGap="10px" (ngSubmit)="formGroup.valid && submitForm()" [formGroup]="formGroup">
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <mat-form-field class="half-width">
            <input matInput formControlName="organisation_name" placeholder="Organisation Name" type="text">
            <mat-error>Organisation name is required</mat-error>
          </mat-form-field>
          <mat-form-field class="half-width">
            <input matInput formControlName="designation" placeholder="Your Designation" type="text">
            <mat-error>Designation is required</mat-error>
          </mat-form-field>
        </div>
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <mat-form-field class="half-width">
            <input matInput formControlName="from" [max]="to.value" [matDatepicker]="startDatepicker"
                   placeholder="Start Date">
            <mat-datepicker-toggle matSuffix [for]="startDatepicker"></mat-datepicker-toggle>
            <mat-datepicker #startDatepicker></mat-datepicker>
            <mat-error>Start Date is required</mat-error>
          </mat-form-field>
          <mat-form-field class="half-width">
            <input matInput formControlName="to" [min]="from.value" [matDatepicker]="endDatepicker"
                   placeholder="End Date">
            <mat-datepicker-toggle matSuffix [for]="endDatepicker"></mat-datepicker-toggle>
            <mat-datepicker #endDatepicker></mat-datepicker>
          </mat-form-field>
        </div>
        <mat-form-field class="full-width">
          <input matInput formControlName="location" placeholder="Location" type="text">
          <mat-error>Location is required</mat-error>
        </mat-form-field>
        <mat-form-field class="full-width">
          <textarea matInput style="max-height: 100px" placeholder="Description"
                    formControlName="description"></textarea>
        </mat-form-field>
        <div fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="15px">
          <mat-spinner *ngIf="isSaving" [diameter]="30" [strokeWidth]="4"></mat-spinner>
          <button type="submit" color="accent" [disabled]="isSaving" mat-raised-button>{{buttonTitle}}</button>
        </div>
      </form>
    </ci-modal-layout-popup>
  `,
  styles: [``]
})

export class ExperiencePopupComponent implements OnInit {
  headerTitle = 'Add Experience';
  buttonTitle = 'Save';

  isSaving = false;

  formGroup: FormGroup;

  from: FormControl;
  to: FormControl;
  organisation_name: FormControl;
  designation: FormControl;
  description: FormControl;
  location: FormControl;

  constructor(private service: ConnectInnService, private dialog: MatDialog) {
    this.organisation_name = new FormControl(null, [Validators.required]);
    this.designation = new FormControl(null, [Validators.required]);
    this.from = new FormControl(null, [Validators.required]);
    this.location = new FormControl(null, [Validators.required]);
    this.to = new FormControl();
    this.description = new FormControl();

    this.formGroup = new FormGroup({
      organisation_name: this.organisation_name,
      designation: this.designation,
      description: this.description,
      from: this.from,
      to: this.to,
      location: this.location
    });
  }

  ngOnInit() {

  }

  submitForm() {
    this.from.setValue(Utils.getDateInFormat(getDateObj(this.from.value)));
    this.to.setValue(Utils.getDateInFormat(getDateObj(this.to.value)));
    const data = this.formGroup.value;

    this.isSaving = true;

    this.service.createExperience(data).subscribe(data => {
      this.isSaving = false;
      this.dialog.closeAll();
    });
  }
}
