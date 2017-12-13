import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {getEducations, getUser, State} from "../reducers";
import {User} from "../models/user";
import {MatDialog} from "@angular/material";
import {EditProfileComponent} from "./dialogs/users/edit-profile";
import {Education} from "../models/education";

@Component({
  selector: 'ci-profile',
  template: `
    <div fxLayout="row" style="margin-top: 15px" fxLayoutAlign="start stretch" fxLayoutGap="10px">
      <div fxLayout="column" fxFlex="30%">
        <div style="margin-left: 25px">
          <img class="profile-img"  [src]="user.profile_pic" [alt]="user.name">
          <p id="ed" class="sub-heading">EDUCATIONS</p>
          <div fxLayout="column" *ngFor="let education of educations">
            {{education.school}}
          </div>
        </div>
      </div>
      <div fxLayout="column" fxFlex="70%" fxLayoutAlign="start start">
        <h2>{{user.name}}</h2>
        <p class="small-text">{{user.about}}</p>
        <hr>
        <mat-tab-group [ngStyle]="{width: '100%'}">
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon>account_circle</mat-icon>&nbsp;About
            </ng-template>
            <div style="margin-top: 30px">
              <div>
                <p class="sub-heading">CONTACT INFORMATION</p>
                <div fxLayout="column" fxLayoutGap="25px" style="margin-top: 20px">
                  <div fxLayout="row">
                    <p class="small-text"><strong class="small-text">Phone:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{user.phone}}</p>
                  </div>
                  <div fxLayout="row">
                    <p class="small-text"><strong class="small-text">Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{user.email}}</p>
                  </div>
                </div>
              </div>
              <div style="margin-top: 30px">
                <p class="sub-heading">BASIC INFORMATION</p>
                <div fxLayout="column" fxLayoutGap="25px" style="margin-top: 20px">
                  <div fxLayout="row">
                    <p class="small-text"><strong class="small-text">Birthday:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{user.date_of_birth | date:'mediumDate'}}</p>
                  </div>
                </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`    
    .profile-img {
      height: 200px;
      width: 200px;
      border-radius: 2px;
    }
    
    .sub-heading {
      color: gray;
      font-size: 0.75em;
    }
    
    .small-text {
      font-size: 0.85em;
    }
  `]
})

export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  private alive = true;
  educations: Education[] = [];

  step = 0;


  constructor(private store: Store<State>, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.store.select(getUser).takeWhile(() => this.alive).subscribe(user => {
      this.user = user;
    });
    this.store.select(getEducations).takeWhile(() => this.alive).subscribe(educations => {
      this.educations = educations;
      console.log(educations);
    });
  }

  openProfileDialog() {
    const dialog = this.dialog.open(EditProfileComponent).updateSize('60%', '55%');
    dialog.componentInstance.user = this.user;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
