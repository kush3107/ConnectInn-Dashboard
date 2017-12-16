import {Component, OnInit} from "@angular/core";
import {ConnectInnService} from "../../services/connect-inn";
import {MatDialog} from "@angular/material";
import {AlertService} from "../../services/alert";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getDateObj, Utils} from "../../utils";

@Component({
  selector: 'ci-education-popup', template: `
    <ci-modal-layout-popup headerTitle="{{headerTitle}}">
      <form fxLayout="column" fxLayoutGap="10px" (ngSubmit)="formGroup.valid && submitForm()" [formGroup]="formGroup">
        <mat-form-field class="full-width">
          <input matInput formControlName="school" placeholder="School" type="text">
          <mat-error>School name is required</mat-error>
        </mat-form-field>
        <mat-form-field class="full-width">
          <input matInput formControlName="degree" placeholder="Degree (eg. High School)" type="text">
          <mat-error>Degree is required</mat-error>
        </mat-form-field>
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <mat-form-field class="half-width">
            <input matInput formControlName="start" [max]="end.value" [matDatepicker]="startDatepicker"
                   placeholder="Start Date">
            <mat-datepicker-toggle matSuffix [for]="startDatepicker"></mat-datepicker-toggle>
            <mat-datepicker #startDatepicker></mat-datepicker>
            <mat-error>Start Date is required</mat-error>
          </mat-form-field>
          <mat-form-field class="half-width">
            <input matInput formControlName="end" [min]="start.value" [matDatepicker]="endDatepicker"
                   placeholder="End Date">
            <mat-datepicker-toggle matSuffix [for]="endDatepicker"></mat-datepicker-toggle>
            <mat-datepicker #endDatepicker></mat-datepicker>
          </mat-form-field>
        </div>
        <mat-form-field class="full-width">
          <input matInput formControlName="location" placeholder="Location" type="text">
          <mat-error>Location is required</mat-error>
        </mat-form-field>
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <mat-form-field class="half-width">
            <mat-select placeholder="Type" formControlName="grade_type">
              <mat-option *ngFor="let type of gradeTypes" [value]="type.slug">
                {{ type.displayValue }}
              </mat-option>
            </mat-select>
            <mat-error>Please select a type</mat-error>
          </mat-form-field>
            <mat-form-field class="half-width">
              <input matInput formControlName="grade" placeholder="Grade" type="number">
              <mat-error>Grade is required</mat-error>
            </mat-form-field>
        </div>
        <div fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="15px">
          <mat-spinner *ngIf="isSaving" [diameter]="30" [strokeWidth]="4"></mat-spinner>
          <button type="submit" color="accent" [disabled]="isSaving" mat-raised-button>{{buttonTitle}}</button>
        </div>
      </form>
    </ci-modal-layout-popup>
  `, styles: [``]
})

export class EducationPopupComponent implements OnInit {
  headerTitle = 'Create Education';
  buttonTitle = 'Save';

  formGroup: FormGroup;

  school: FormControl;
  degree: FormControl;
  start: FormControl;
  end: FormControl;
  gradeType: FormControl;
  grade: FormControl;
  location: FormControl;

  gradeTypes = [
    {
      slug: 'cgpa',
      displayValue: 'CGPA'
    },
    {
      slug: 'percentage',
      displayValue: 'Percentage'
    }
  ];

  isSaving = false;

  constructor(private service: ConnectInnService, private dialog: MatDialog, private alertService: AlertService) {
    this.school = new FormControl(null, [Validators.required]);
    this.start = new FormControl(null, [Validators.required]);
    this.degree = new FormControl(null, [Validators.required]);
    this.gradeType = new FormControl(null, [Validators.required]);
    this.grade = new FormControl(null, [Validators.required]);
    this.location = new FormControl(null, [Validators.required]);
    this.end = new FormControl();

    this.formGroup = new FormGroup({
      school: this.school,
      grade: this.grade,
      grade_type: this.gradeType,
      degree: this.degree,
      location: this.location,
      start: this.start,
      end: this.end
    });
  }

  ngOnInit() {

  }

  submitForm() {
    this.start.setValue(Utils.getDateInFormat(getDateObj(this.start.value)));
    this.end.setValue(Utils.getDateInFormat(getDateObj(this.end.value)));
    const data = this.formGroup.value;

    this.isSaving = true;

    this.service.createEducation(data).subscribe(education => {
      this.dialog.closeAll();
    });
  }
}
