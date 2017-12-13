import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {ConnectInnService} from "../../services/connect-inn";

@Component({
  selector: 'ci-follower-card',
  template: `
    <mat-card class="follower-card">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>{{follower.name}}</mat-card-title>
        <mat-card-subtitle>{{follower.email}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          {{follower.about}}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>Follow</button>
        <button mat-button (click)="deleteFollower()">UnFollow</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .follower-card {
      width: 200px;
    }

    .example-header-image {
      background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
      background-size: cover;
    }
  `]
})

export class FollowerCardComponent implements OnInit{
  @Input() follower: User;

  constructor(private service: ConnectInnService) {

  }

  ngOnInit() {

  }

  deleteFollower() {
    this.service.removeFollower(this.follower.id).subscribe();
  }
}
