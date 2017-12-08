import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUser, State} from "../reducers";
import {User} from "../models/user";
import {MatDialog} from "@angular/material";
import {EditProfileComponent} from "./dialogs/users/edit-profile";

@Component({
  selector: 'ci-profile',
  template: `
    <div fxLayout="column" style="margin-top: 10px" fxLayoutAlign="start stretch" fxLayoutGap="15px">
      <mat-accordion fxFlex="80%" class="example-headers-align">
        <mat-expansion-panel [expanded]="step === 0" hideToggle="true">
          <mat-expansion-panel-header>
            <mat-panel-title fxLayout="row" fxLayoutAlign="center center">
              <h2>{{user.name}}</h2>
            </mat-panel-title>
          </mat-expansion-panel-header>
          
          <div fxLayout="row" fxLayoutAlign="space-around center">
            <p>{{user.email}}</p>
            <p>{{user.phone}}</p>
            <p>{{user.date_of_birth}}</p>
            <p>{{user.rating}}</p>
          </div>
          
          <div fxFlexAlign="center">
            <p>{{user.about}}</p>
          </div>
          
          <mat-action-row>
            <button mat-button color="primary" (click)="openProfileDialog()">Edit Profile</button>
          </mat-action-row>
        </mat-expansion-panel>

      </mat-accordion>

    </div>
  `,
  styles: [`
    .example-headers-align .mat-expansion-panel-header-title,
    .example-headers-align .mat-expansion-panel-header-description {
      flex-basis: 0;
    }

    .example-headers-align .mat-expansion-panel-header-description {
      justify-content: space-between;
      align-items: center;
    }

  `]
})

export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  private alive = true;

  step = 0;


  constructor(private store: Store<State>, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.store.select(getUser).takeWhile(() => this.alive).subscribe(user => {
      this.user = user;
    })
  }

  openProfileDialog() {
    const dialog = this.dialog.open(EditProfileComponent).updateSize('60%', '55%');
    dialog.componentInstance.user = this.user;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
