import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {ConnectInnService} from "../../services/connect-inn";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'ci-follower-card',
  template: `
    <mat-card class="follower-card" style="display: inline-block">
      <mat-card-header>
        <div mat-card-avatar [style.background-image]="sanitizeImage(follower.profile_pic)"  class="example-header-image"></div>
        <mat-card-title>{{follower.name}}</mat-card-title>
        <mat-card-subtitle>{{follower.email}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>
          {{follower.about}}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="deleteFollower()">Un Follow</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .follower-card {
    }

    .example-header-image {
      background-size: cover;
    }
  `]
})

export class FollowerCardComponent implements OnInit{
  @Input() follower: User;

  constructor(private service: ConnectInnService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {

  }

  public sanitizeImage(image: string) {
    if (!image) {
      image = '/assets/images/default_pro_picture.png';
    }

    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  deleteFollower() {
    this.service.removeFollower(this.follower.id).subscribe();
  }
}
