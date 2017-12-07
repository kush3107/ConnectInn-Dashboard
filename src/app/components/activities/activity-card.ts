import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Activity} from "../../models/activity";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {CreateActivityDialogComponent} from "../dialogs/activities/create-activity-dialog";

@Component({
  selector: 'ci-activity-card', template: `
    <mat-card fxLayout="column" class="example-card">
      <mat-card-header style="cursor: pointer">
        <mat-card-title (click)="openActivityDetail()"><h2>{{activity.title}}</h2></mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          {{activity.description}}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-icon-button (click)="editActivityDialog()">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button>
          <mat-icon>delete</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `, styles: [`
    
    .example-card {
      width: 75%;
    }

    .example-header-image {
      background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
      background-size: cover;
    }
  `]
})

export class ActivityCardComponent {
  @Input() activity: Activity;

  constructor(private router: Router, private dialog: MatDialog) {

  }

  openActivityDetail() {
    console.log('clicked');
    this.router.navigate(['activities/' + this.activity.id]);
  }

  editActivityDialog() {
    const dialog = this.dialog.open(CreateActivityDialogComponent);
    dialog.componentInstance.activity = this.activity;
  }
}
