import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireDatabase} from "angularfire2/database";
import {environment} from "../../environments/environment";

@Component({
  selector: 'ci-inbox-container',
  template: ``,
  styles: [``]
})

export class InboxContainerComponent {
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    db.list('root/chats/user_1_2').valueChanges().subscribe(event => {
      console.log(event);
    })
  }
}
