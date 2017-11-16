import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConnectInnService} from "../services/connect-inn";
import {MatSnackBar} from "@angular/material";
import {AlertService} from "../services/alert";

@Component({
  selector: 'ci-register',
  template: `
    <div class="overlay" fxLayoutAlign="center center">
      <div fxLayout="column" fxFlex="450px" fxFlex.xs="90%" fxLayoutGap="20px">
        <mat-card fxFlex="75%">
          <h1>Register yourself!</h1>
          <form fxLayout="column" fxLayoutAlign="center stretch"
                fxFlexAlign="center" fxLayoutGap="10px"
                [formGroup]="signupForm" (ngSubmit)="signupForm.valid && onSubmit()" novalidate>
            <mat-form-field style="width: 100%;">
              <input matInput placeholder="Name" formControlName="name">
              <mat-hint>Your Name</mat-hint>
              <mat-error>Name is required</mat-error>
            </mat-form-field>
            <mat-form-field style="width: 100%;">
              <input matInput placeholder="Email" formControlName="email">
              <mat-hint>Your email</mat-hint>
              <mat-error>Valid email is required</mat-error>
            </mat-form-field>
            <mat-form-field style="width: 100%">
              <input matInput type="password" placeholder="Password" formControlName="password">
              <mat-error>Password is required</mat-error>
            </mat-form-field>
            <mat-form-field style="width: 100%">
              <input matInput type="password" placeholder="Password Confirmation" formControlName="password_confirmation">
              <mat-error>Confirm Password is required</mat-error>
            </mat-form-field>
            <div fxLayout="row" fxLayoutAlign="end center">
              <mat-spinner color="accent" *ngIf="loading" [diameter]="30" [strokeWidth]="4"></mat-spinner>
              <button mat-raised-button fxFlexAlign="end" color="primary" [disabled]="loading"
                      color="accent">
                Register
              </button>
            </div>
            <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px" [style.margin-top]="'20px'">
              <a routerLink="/login">Login</a>
              <mat-icon>fiber_manual_record</mat-icon>
              <a routerLink="/password/forget">Forgot Password?</a>
            </div>
          </form>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        min-width: 300px;
        min-height: 300px;
      }

      mat-spinner {
        margin-right: 20px;
      }

      mat-icon {
        font-size: 10px;
        height: 10px;
        width: 10px;
      }
    `
  ]
})

export class RegisterComponent implements OnInit {
  loading: boolean = false;
  signupForm: FormGroup;

  constructor(private service: ConnectInnService, private alertService: AlertService) {

  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'password_confirmation': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const data = this.signupForm.value;

    if (data.password !== data.password_confirmation) {
      this.alertService.error('Password and confirm passwords do not match!');
    } else {
      this.loading = true;
      this.service.register(data).subscribe(user => {
        this.loading = false;
        this.alertService.success('Registered');
      },
        err => {
        this.loading = false;
        this.alertService.error(err.message);
        });
    }
  }
}
