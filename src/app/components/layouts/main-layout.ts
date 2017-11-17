import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ci-layout',
  template: `
        <ci-header></ci-header>
        <ng-content></ng-content>
    `,
  styles: []
})
export class LayoutMainComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
