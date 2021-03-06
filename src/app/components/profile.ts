import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {getEducations, getExperiences, getUser, State} from "../reducers";
import {getAttributes, User} from "../models/user";
import {MatDialog} from "@angular/material";
import {EditProfileComponent} from "./dialogs/users/edit-profile";
import {Education} from "../models/education";
import {EducationPopupComponent} from "./dialogs/education-popup";
import {Experience} from "../models/experience";
import {ExperiencePopupComponent} from "./dialogs/experience-popup";
import {Attribute} from "../models/attribute";

@Component({
  selector: 'ci-profile',
  template: `
    <div fxLayout="row" style="margin-top: 15px" fxLayoutAlign="start stretch" fxLayoutGap="10px">
      <div fxLayout="column" fxFlex="30%">
        <div style="margin-left: 25px">
          <img class="profile-img"  [src]="user.profile_pic == null ? '/assets/images/default_pro_picture.png' : user.profile_pic" [alt]="user.name">
          <div>
            <div fxLayout="row" fxLayoutAlign="start center">
              <p id="ed" class="sub-heading">EXPERIENCES</p>
              <button fxFlexOffset="30" mat-icon-button (click)="openExperiencePopup()">
                <mat-icon>add</mat-icon>
              </button>
            </div>
            <br>
            <div fxLayout="column" *ngFor="let exp of experiences">
              {{exp.organisation_name}}
            </div>
          </div>
          <br>
          <div>
            <div fxLayout="row" fxLayoutAlign="start center">
              <p id="ed" class="sub-heading">EDUCATIONS</p>
              <button fxFlexOffset="30" mat-icon-button (click)="openEducationPopup()">
                <mat-icon>add</mat-icon>
              </button>
            </div>
            <br>
            <div fxLayout="column" *ngFor="let education of educations">
              {{education.school}}
            </div>
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
        <mat-tab-group [ngStyle]="{width: '100%'}">
          <mat-tab>
            <ng-template mat-tab-label>
              Skills
            </ng-template>
            <mat-chip-list>
              <mat-chip *ngFor="let skill of skills">
                {{skill.value}}
              </mat-chip>
            </mat-chip-list>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              Interests
            </ng-template>
            <mat-chip-list>
              <mat-chip *ngFor="let interest of interests">
                {{interest.value}}
              </mat-chip>
            </mat-chip-list>
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
  experiences: Experience[] = [];

  skills: Attribute[] = [];
  interests: Attribute[] = [];

  step = 0;


  constructor(private store: Store<State>, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.store.select(getUser).takeWhile(() => this.alive).subscribe(user => {
      this.user = user;
      this.skills = getAttributes(this.user).filter(attr => attr.type === 'skill');
      this.interests = getAttributes(this.user).filter(attr => attr.type === 'interest');
    });
    this.store.select(getEducations).takeWhile(() => this.alive).subscribe(educations => {
      this.educations = educations;
      console.log(educations);
    });
    this.store.select(getExperiences).takeWhile(() => this.alive).subscribe(exps => {
      this.experiences = exps;
    })
  }

  openProfileDialog() {
    const dialog = this.dialog.open(EditProfileComponent).updateSize('60%', '55%');
    dialog.componentInstance.user = this.user;
  }

  openEducationPopup() {
    this.dialog.open(EducationPopupComponent).updateSize('60%', '75%')
  }

  openExperiencePopup() {
    this.dialog.open(ExperiencePopupComponent).updateSize('60%', '70%')
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
