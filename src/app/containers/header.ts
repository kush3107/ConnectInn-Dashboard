import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {getUser, State} from '../reducers/index';
import {User} from '../models/user';
import {ConnectInnService} from "../services/connect-inn";

@Component({
  selector: 'ci-header',
  template: `
    <mat-toolbar color="primary">
      <div fxLayoutAlign="start center" fxFlex="100%">
        <!--<img width="60" class="logo" (click)="home()" src="/assets/images/logo.png">-->
        <button id="accounts_link" mat-button routerLink="/feed" routerLinkActive="selected">Home</button>
        <button id="ctas_link" mat-button routerLink="/my-activities" routerLinkActive="selected">My Activities</button>
        <span fxFlex="1 1 auto"></span>
        
        <button mat-button type="button" [matMenuTriggerFor]="userSettingsMenu">
          {{username | titlecase}}
          <mat-icon>keyboard_arrow_down</mat-icon>
        </button>
        
      </div>
    </mat-toolbar>

    <mat-menu [overlapTrigger]="false" #userSettingsMenu="matMenu">
      <button mat-menu-item (click)="settingsButtonTapped()">Settings</button>
      <button mat-menu-item (click)="logout()">Logout</button>
    </mat-menu>
  `,
  styles: [`
    mat-toolbar {
      padding: 10px;
    }

    button.selected {
      border-bottom: 3px solid white;
    }

    .logo {
      margin-right: 20px;
      cursor: pointer;
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User;
  username: string;
  alive = true;

  constructor(public router: Router, public store: Store<State>, public service: ConnectInnService) {
  }

  ngOnInit() {

    this.store.select(getUser).filter(user => !!user).takeWhile(() => this.alive).subscribe(user => {
      this.user = user;
      this.username = user.name;
    });
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  home() {
    this.router.navigate(['/feed']);
  }

  settingsButtonTapped() {
    this.router.navigate(['/settings']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
