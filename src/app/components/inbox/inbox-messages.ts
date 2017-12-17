import {Component} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'ci-inbox-messages',
  template: `
    <h1>{{title}}</h1>
  `,
  styles: [``]
})

export class InboxMessagesComponent {
  title;

  constructor(private routerState: ActivatedRoute) {
    this.routerState.params.subscribe(params => {
      this.title = params['channel'];
    })
  }
}
