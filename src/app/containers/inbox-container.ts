import {AfterContentInit, Component, OnDestroy, OnInit} from "@angular/core";
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
        <div class="thread-box"
             fxLayout="row"
             fxLayoutGap="10px"
             fxLayoutAlign="start center"
             [ngClass]="i == selectedIndex ? 'selectedBackground' : ''"
             *ngFor="let thread of threads; let i=index"
             (click)="navigate(i)">
          <img class="avatarImg"
               [src]="thread.profile_pic == null ? '/assets/images/default_pro_picture.png' : thread.profile_pic"
               [alt]="thread.name">
          <p>{{thread.name}}</p>
        </div>
      </div>
      <div fxFlex="75%">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .thread-box {
      height: 60px;
      margin-top: 10px;
      cursor: pointer;
    }
    
    .avatarImg {
      width: 50px;
      height: 50px
    }
    
    .selectedBackground {
      background-color: #f2f2f2;
    }
    
    img {
      border-radius: 50%;
    }
  `]
})

export class InboxContainerComponent implements OnDestroy {
  threads: User[] = [];
  channels: string[] = [];
  user: User;

  alive = true;

  selectedIndex = -1;

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
            this.threads.push(followers[id]);
          } else {
            this.threads.push(getFollowing(this.user).find(f => f.id === otherId));
          }
        });

        console.log(this.threads);
      }

      this.loading = false;
      if (this.alive) {
        this.navigate(0);
      }
    })
  }

  navigate(i: number) {
    this.selectedIndex = i;
    this.router.navigate(['inbox/' + this.channels[i]]);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
