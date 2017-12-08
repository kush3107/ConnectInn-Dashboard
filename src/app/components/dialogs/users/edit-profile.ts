import {Component, Input, OnInit} from "@angular/core";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {getDateObj} from "../../../utils";
import {ConnectInnService} from "../../../services/connect-inn";
import {AlertService} from "../../../services/alert";

@Component({
  selector: 'ci-edit-profile',
  template: `
    <ci-modal-layout-popup headerTitle="Profile">
      <form fxLayout="column" fxLayoutGap="10px" [formGroup]="formGroup" (ngSubmit)="submitForm()">
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <mat-form-field class="half-width">
            <input matInput formControlName="name" placeholder="Name" type="text">
            <mat-error>Name is required</mat-error>
          </mat-form-field>
          <mat-form-field class="half-width">
            <input matInput formControlName="email" placeholder="Email" type="email">
            <mat-error>Email is required</mat-error>
          </mat-form-field>
        </div>
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <mat-form-field class="half-width">
            <input matInput [matDatepicker]="picker" formControlName="dob" placeholder="Date of Birth">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <mat-form-field class="half-width">
            <input matInput formControlName="phone" placeholder="Phone" type="tel">
          </mat-form-field>
        </div>
        <mat-form-field class="full-width">
          <textarea matInput style="max-height: 100px" placeholder="About"
                    formControlName="about"></textarea>
        </mat-form-field>
        <div fxLayout="row" fxLayoutGap="15px" fxLayoutAlign="end center">
          <mat-spinner *ngIf="isSaving" [diameter]="30" [strokeWidth]="4"></mat-spinner>
          <button type="submit" color="accent" [disabled]="isSaving" mat-raised-button>Save</button>
        </div>
      </form>
    </ci-modal-layout-popup>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }

    .half-width {
      width: 48%;
    }
  `]
})

export class EditProfileComponent implements OnInit {
  @Input() user: User;

  formGroup: FormGroup;

  name: FormControl;
  email: FormControl;
  phone: FormControl;
  dob: FormControl;
  about: FormControl;

  isSaving = false;

  constructor(private service: ConnectInnService, private alert: AlertService) {

  }

  ngOnInit() {
    this.name = new FormControl(null, [Validators.required]);
    this.email = new FormControl(null, [Validators.required]);
    this.phone =  new FormControl();
    this.dob = new FormControl();
    this.about = new FormControl();

    this.formGroup = new FormGroup({
      name: this.name,
      email: this.email,
      phone: this.phone,
      dob: this.dob,
      about: this.about
    });

    this.setupUser();
  }

  private setupUser() {
    this.name.setValue(this.user.name);
    this.email.setValue(this.user.email);
    this.phone.setValue(this.user.phone);
    this.dob.setValue(getDateObj(this.user.date_of_birth));
    this.about.setValue(this.user.about);
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    this.isSaving = true;

    const data = this.formGroup.getRawValue();

    this.service.updateMe(data).subscribe(user => {
      this.isSaving = false;
    }, err => {
      this.isSaving = false;
      this.alert.error(err.message);
    });
  }
}
