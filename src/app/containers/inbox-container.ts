import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import {environment} from "../../environments/environment";
import {UserMessage} from "../models/user-message";

@Component({
  selector: 'ci-inbox-container',
  template: `
    <div fxLayout="row">
      <div fxFlex="25%"></div>
      <div fxFlex="75%"></div>
    </div>
  `,
  styles: [``]
})

export class InboxContainerComponent {
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    db.list<UserMessage>('root/chats/user_1_2').valueChanges().subscribe(event => {
      console.log(event);
    })
  }
}
