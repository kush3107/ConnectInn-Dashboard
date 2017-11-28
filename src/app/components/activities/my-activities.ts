import {Component, OnInit} from "@angular/core";
import {Activity} from "../../models/activity";
import {Store} from "@ngrx/store";
import {getMyActivities, getMyActivitiesLoaded, getMyActivitiesLoading, State} from "../../reducers/index";
import {ConnectInnService} from "../../services/connect-inn";

@Component({
  selector: 'ci-my-activites',
  template: `
    <mat-spinner *ngIf="!loaded"></mat-spinner>
    <p *ngFor="let a of activities">{{a.title}}</p>
  `, styles: []
})

export class MyActivitiesListComponent implements OnInit {
  activities: Activity[];
  loaded = false;
  public alive = true;

  constructor(private store: Store<State>, private service: ConnectInnService) {

  }

  ngOnInit() {
    const activities$ = this.store.select(getMyActivities);
    const activitiesLoaded$ = this.store.select(getMyActivitiesLoaded);
    const activitiesLoading$ = this.store.select(getMyActivitiesLoading);

    activities$.combineLatest(activitiesLoaded$, activitiesLoading$, (activities, loaded, loading) => {
      return {activities, loaded, loading};
    }).takeWhile(() => this.alive).subscribe(data => {
      if (!data.loading && !data.loaded) {
        this.service.listMyActivities().subscribe();
      } else if (data.loaded && !data.loading) {
        this.loaded = true;
        this.activities = data.activities;
      }
    });
  }
}
