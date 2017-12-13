import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "../models/user";
import {Store} from "@ngrx/store";
import {getFollowers, State} from "../reducers";

@Component({
  selector: 'ci-followers',
  template: `
    <div fxLayout="row" fxLayoutWrap fxLayoutGap="20px" style="margin-top: 10px">
      <ci-follower-card *ngFor="let follower of followers" [follower]="follower"></ci-follower-card>
    </div>
  `,
  styles: [`
  `]
})

export class FollowersComponent implements OnInit, OnDestroy {
  followers: User[] = [];
  alive = true;

  constructor(private store: Store<State>) {

  }

  ngOnInit() {
    this.store.select(getFollowers).takeWhile(() => this.alive).subscribe(followers => {
      this.followers = followers;
    })
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
