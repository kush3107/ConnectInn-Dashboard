import {Component} from "@angular/core";

@Component({
  selector: 'ci-dashboard', template: `
    <ci-layout>
      <router-outlet></router-outlet>
    </ci-layout>  `,
  styles: []
})

export class DashboardComponent {

}
