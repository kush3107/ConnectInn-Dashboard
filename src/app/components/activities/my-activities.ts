import {Component, OnDestroy, OnInit} from "@angular/core";
import {Activity} from "../../models/activity";
import {Store} from "@ngrx/store";
import {getMyActivities, getMyActivitiesLoaded, getMyActivitiesLoading, State} from "../../reducers/index";
import {ConnectInnService} from "../../services/connect-inn";
import {MatDialog} from "@angular/material";
import {CreateActivityDialogComponent} from "../dialogs/activities/create-activity-dialog";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ci-my-activites',
  template: `
    <ci-center-spinner *ngIf="loading$ | async"></ci-center-spinner>
    <p *ngFor="let a of activities">{{a.title}}</p>
    <button mat-raised-button (click)="openActivityDialog()">Create</button>
  `, styles: []
})

export class MyActivitiesListComponent implements OnInit, OnDestroy {
  activities: Activity[];
  loading$: Observable<boolean>;
  public alive = true;

  constructor(private store: Store<State>, private service: ConnectInnService, private dialog: MatDialog) {

  }

  ngOnInit() {

    this.store.select(getMyActivities).takeWhile(() => this.alive).subscribe(activities => {
      this.activities = activities;
    });

    this.loading$ = this.store.select(getMyActivitiesLoading);
  }

  openActivityDialog() {
    this.dialog.open(CreateActivityDialogComponent).updateSize('80%');
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
