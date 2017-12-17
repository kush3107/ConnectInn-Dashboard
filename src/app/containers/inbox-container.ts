import {Component, OnDestroy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import {environment} from "../../environments/environment";
import {UserMessage} from "../models/user-message";
import {getFollowing, User} from "../models/user";
import {Store} from "@ngrx/store";
import {getFollowerEntities, getFollowers, getUser, State} from "../reducers";
import {Router} from "@angular/router";

@Component({
  selector: 'ci-inbox-container',
  template: `
    <mat-progress-bar *ngIf="loading" [color]="'warn'" mode="indeterminate"></mat-progress-bar>
    <div *ngIf="!loading" fxLayout="row">
      <div fxFlex="25%">
        <div class="thread-box" *ngFor="let thread of threads; let i=index" (click)="navigate(i)">
          {{thread}}
        </div>
      </div>
      <div fxFlex="75%">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .thread-box {
      height: 20px;
    }
  `]
})

export class InboxContainerComponent implements OnDestroy {
  items: Observable<any[]>;
  threads: string[] = [];
  channels: string[] = [];
  user: User;

  alive = true;

  loading = true;

  constructor(private db: AngularFireDatabase, private store: Store<State>, private router: Router) {
    this.store.select(getUser).takeWhile(() => this.alive).subscribe(user => this.user = user);
    db.list<any>('root/').valueChanges().subscribe(events => {
      this.threads = [];
      this.channels = [];
      const chats = events[0];
      for (const key in chats) {
        const parts = key.split('_');

        let otherId = 0;

        if (+parts[1] === this.user.id) {
          otherId = +parts[2];
        } else if (+parts[2] === this.user.id) {
          otherId = +parts[1];
        } else {
          continue;
        }

        this.channels.push(key);
        console.log(getFollowing(this.user));


        this.store.select(getFollowers).takeWhile(() => this.alive).subscribe(followers => {
          const id = followers.findIndex(follower => follower.id === otherId);
          if (id !== -1) {
            this.threads.push(followers[id].name);
          } else {
            this.threads.push(getFollowing(this.user).find(f => f.id === otherId).name);
          }
        });

        console.log(this.threads);
      }

      this.loading = false;
    })
  }

  navigate(i: number) {
    this.router.navigate(['inbox/' + this.channels[i]]);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
