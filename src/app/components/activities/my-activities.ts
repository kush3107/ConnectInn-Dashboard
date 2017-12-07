import {Component, OnDestroy, OnInit} from "@angular/core";
import {Activity} from "../../models/activity";
import {Store} from "@ngrx/store";
import {getMyActivities, getMyActivitiesLoaded, getMyActivitiesLoading, State} from "../../reducers/index";
import {ConnectInnService} from "../../services/connect-inn";
import {MatDialog} from "@angular/material";
import {CreateActivityDialogComponent} from "../dialogs/activities/create-activity-dialog";
import {Observable} from "rxjs/Observable";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'ci-my-activites', template: `
    <ci-center-spinner *ngIf="loading$ | async"></ci-center-spinner>
    <div fxLayout="column" fxLayoutGap="20px" style="margin-top: 10px"></div>
    <div fxLayout="row">
      <span fxFlex="1 1 auto"></span>
      <button mat-raised-button (click)="openActivityDialog()">Create</button>
    </div>
    <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="10px">
      <ci-activity-card
        *ngFor="let a of activities"
        [activity]="a">
      </ci-activity-card>
    </div>
  `, styles: []
})

export class MyActivitiesListComponent implements OnInit, OnDestroy {
  activities: Activity[];
  loading$: Observable<boolean>;
  public alive = true;

  constructor(private store: Store<State>,
              private service: ConnectInnService,
              private dialog: MatDialog,
              private router: Router) {

  }

  ngOnInit() {

    this.store.select(getMyActivities).takeWhile(() => this.alive).subscribe(activities => {
      this.activities = activities;
    });

    this.loading$ = this.store.select(getMyActivitiesLoading);
  }

  openActivityDialog() {
    const dialog = this.dialog.open(CreateActivityDialogComponent).updateSize('80%');
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
