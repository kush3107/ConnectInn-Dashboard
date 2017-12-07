import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Activity} from "../../models/activity";

@Component({
  selector: 'ci-activity-card', template: `
    <mat-card style="cursor:pointer;" fxLayout="column" class="example-card">
      <mat-card-header>
        <mat-card-title>{{activity.title}}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>
          {{activity.description}}
        </p>
      </mat-card-content>
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
}
