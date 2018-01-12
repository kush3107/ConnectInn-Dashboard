import {Component, OnDestroy, OnInit} from "@angular/core";
import {Activity, getInvitations, getMembers, getOwner, getRequests} from "../../models/activity";
import {ConnectInnService} from "../../services/connect-inn";
import {Store} from "@ngrx/store";
import {getMyactivitiesEntities, State} from "../../reducers";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user";
import {Invitation} from "../../models/invitation";
import {ActivityRequest} from "../../models/activity-request";

@Component({
  selector: 'ci-activity-detail', template: `
    <div fxLayout="column" fxLayoutGap="10px">
      <div fxLayout="column" fxLayoutAlign="start center">
        <h1>{{activity.title}}</h1>
        <p>{{activity.description}}</p>
      </div>
      <div>
        <div fxLayout="row">
          <div fxLayout="column">
            <mat-accordion>
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Owner Details
                  </mat-panel-title>
                </mat-expansion-panel-header>
                {{owner.name}}
              </mat-expansion-panel>
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Members
                  </mat-panel-title>
                  <mat-list>
                    
                  </mat-list>
                </mat-expansion-panel-header>
                <p></p>
              </mat-expansion-panel>
            </mat-accordion>
          </div>
        </div>
      </div>
    </div>
  `, styles: [`
  `]
})

export class ActivityDetailComponent implements OnInit, OnDestroy {
  activity: Activity;
  alive = true;
  owner: User;
  members: User[] = [];
  invitations: Invitation[] = [];
  requests: ActivityRequest[] = [];

  constructor(private service: ConnectInnService, private store: Store<State>, private routerState: ActivatedRoute) {
    this.routerState.params.subscribe(params => {
      const id = +params['id'];
      this.store.select(getMyactivitiesEntities).takeWhile(() => this.alive).subscribe(entities => {
        this.activity = entities[id];
        this.owner = getOwner(this.activity);
        this.members = getMembers(this.activity);
        this.requests = getRequests(this.activity);
        this.invitations = getInvitations(this.activity);
        console.log(this.members);
      })
    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.alive = false;
  }
}
