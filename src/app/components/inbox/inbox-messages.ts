import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import {UserMessage} from "../../models/user-message";
import {User} from "../../models/user";
import {Store} from "@ngrx/store";
import {getUser, State} from "../../reducers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConnectInnService} from "../../services/connect-inn";

@Component({
  selector: 'ci-inbox-messages', template: `
    <div #chatContainer fxLayout="column" class="container">
      <div *ngFor="let message of messages" [fxFlexAlign]="!isMyMessage(message) ? 'start' : 'end'"
           class="talk-bubble round">
        <div class="talktext">
          <p>{{message.message}}</p>
        </div>
      </div>
    </div>
    <hr>
    <form fxLayout="row" fxLayoutAlign="space-between center" [formGroup]="formGroup"
          (ngSubmit)="formGroup.valid && submitForm()">
          <textarea class="textArea" placeholder="Type Something...."
                    formControlName="message"></textarea>
      <button type="submit" style="width: 18%" color="accent" mat-raised-button>Send</button>
    </form>
  `, styles: [`
    /* General CSS Setup */
    body {
      background-color: lightblue;
    }

    .textArea {
      width: 78%;
      min-height: 70px;
      max-height: 70px;
      max-width: 78%;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      border-color: #194267;
      padding: 10px;
      border-style: solid;
      margin: 2px;
      border-width: 1px;
      border-radius: 3px;
    }

    /* container */
    .container {
      height: 500px;
      overflow: scroll;
    }

    /* CSS talk bubble */
    .talk-bubble {
      margin: 40px;
      display: inline-block;
      width: 200px;
      height: auto;
      background-color: lightblue;
    }

    .border {
      border: 8px solid #666;
    }

    .round {
      border-radius: 30px;
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;

    }

    /* talk bubble contents */
    .talktext {
      padding: 1em;
      text-align: left;
      line-height: 1.5em;
    }

    .talktext p {
      /* remove webkit p margins */
      -webkit-margin-before: 0em;
      -webkit-margin-after: 0em;
    }
  `]
})

export class InboxMessagesComponent implements OnDestroy, OnInit {
  @ViewChild('chatContainer') private scrollContainer: ElementRef;

  channel;
  user: User;
  alive = true;
  messages: UserMessage[] = [];

  formGroup: FormGroup;

  constructor(private routerState: ActivatedRoute, private db: AngularFireDatabase, private store: Store<State>, private service: ConnectInnService) {
    this.routerState.params.subscribe(params => {
      this.channel = params['channel'];
      this.messages = [];
      this.db.list<UserMessage>('root/').valueChanges().subscribe(events => {
        const chats = events[0][this.channel];
        for (const i in chats) {
          const message = chats[i];
          message.id = i;
          if (this.messages.findIndex(message => message.id === i) === -1) {
            this.messages.push(message);
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
          }
          console.log(this.messages);
        }
      });
    });
    this.store.select(getUser).takeWhile(() => this.alive).subscribe(user => {
      this.user = user;
    });

    this.formGroup = new FormGroup({
      message: new FormControl(null, [])
    })
  }

  ngOnInit() {

  }

  public isMyMessage(message: UserMessage): boolean {
    return message.sender.id === this.user.id;
  }

  submitForm() {
    const data = this.formGroup.value;
    data['channel'] = this.channel;

    if (data.message !== '') {
      this.service.sendUserMessage(data).subscribe(() => {
        this.formGroup.reset();
      });
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
