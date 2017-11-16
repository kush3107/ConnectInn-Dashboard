import {Component, OnInit} from "@angular/core";
import {ConnectInnService} from "../services/connect-inn";
import {Router} from "@angular/router";

@Component({
  selector: 'ci-logout',
  template: `
  `,
  styles: []
})

export class LogoutComponent implements OnInit{
  constructor(private service: ConnectInnService, private router: Router) {}

  ngOnInit() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
