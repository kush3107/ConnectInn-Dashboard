import {Component, OnDestroy, OnInit} from "@angular/core";
import {Activity} from "../../models/activity";
import {Store} from "@ngrx/store";
import {getMyActivities, getMyActivitiesLoaded, getMyActivitiesLoading, State} from "../../reducers/index";
import {ConnectInnService} from "../../services/connect-inn";
import {MatDialog, MatSnackBar} from "@angular/material";
import {CreateActivityDialogComponent} from "../dialogs/activities/create-activity-dialog";
import {Observable} from "rxjs/Observable";
import {Route, Router} from "@angular/router";
import {AlertService} from "../../services/alert";

@Component({
  selector: 'ci-my-activites', template: `
    <div fxLayout="column" fxLayoutGap="20px" style="margin-top: 10px"></div>
    <div fxLayout="row">
      <span fxFlex="1 1 auto"></span>
      <button mat-raised-button (click)="openActivityDialog()">Create</button>
    </div>
    <div fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="15px">
      <ci-activity-card
        fxFlexAlign="center"
        style="width: 75%"
        *ngFor="let a of activities"
        (deleteAction)="deleteActivity(a)"
        [activity]="a">
      </ci-activity-card>
    </div>
  `, styles: []
})

export class MyActivitiesListComponent implements OnInit, OnDestroy {
  activities: Activity[];
  public alive = true;

  constructor(private store: Store<State>,
              private service: ConnectInnService,
              private dialog: MatDialog,
              private router: Router,
              private alertService: AlertService) {

  }

  ngOnInit() {

    this.store.select(getMyActivities).takeWhile(() => this.alive).subscribe(activities => {
      this.activities = activities;
    });
  }

  openActivityDialog() {
    const dialog = this.dialog.open(CreateActivityDialogComponent).updateSize('60%', '70%');
  }

  deleteActivity(activity: Activity) {
    console.log('delete');
    this.service.deleteActivity(activity.id).subscribe(() => {
      this.alertService.success('Activity Deleted Successfully')
    }, err => {
      this.alertService.error(err);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
