import {Component, OnDestroy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import {environment} from "../../environments/environment";
import {UserMessage} from "../models/user-message";
import {User} from "../models/user";
import {Store} from "@ngrx/store";
import {getFollowerEntities, getUser, State} from "../reducers";
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

        let followerId = 0;

        if (+parts[1] === this.user.id) {
          followerId = +parts[2];
        } else if (+parts[2] === this.user.id) {
          followerId = +parts[1];
        } else {
          continue;
        }

        this.channels.push(key);

        this.store.select(getFollowerEntities).takeWhile(() => this.alive).subscribe(entities => {
          const follower = entities[followerId];
          this.threads.push(follower.name);
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
