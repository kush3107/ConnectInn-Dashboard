import {Component, OnInit} from "@angular/core";
import {Activity} from "../../models/activity";

@Component({
  selector: 'ci-my-activites',
  template: `
    <h1>My Activities</h1>
  `, styles: []
})

export class MyActivitiesListComponent implements OnInit {
  activities: Activity[];
  activitiesLoading: boolean = false;
  activitiesLoaded: boolean = false;

  ngOnInit() {

  }
}
