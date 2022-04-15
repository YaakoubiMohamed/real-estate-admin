import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Message } from '../shared/classes/message';
import { User } from '../shared/classes/user';
import { MessageService } from '../shared/services/message.service';

import { ChatUser, ChatMessage } from './chat.model';

import { chatData, chatMessagesData } from './data';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('scrollEle') scrollEle;
  @ViewChild('scrollRef') scrollRef;

  username = 'Steven Franklin';

  // bread crumb items
  breadCrumbItems: Array<{}>;

  chatData: ChatUser[];
  chatMessagesData: ChatMessage[];

  formData: FormGroup;

  // Form submit
  chatSubmit: boolean;

  usermessage: string;
  messages: Message[] = [];
  user: User;
  users: Message[];
  opened= false;
  reponses: Message[];


  constructor(public formBuilder: FormBuilder,private messageservice: MessageService) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Chat', active: true }];

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.onListScroll();

    this._fetchData();
    this.getMessages();
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  }

  getMessages(){
    this.messageservice.getMessages().subscribe((res: Message[]) => {
      this.messages = res;
      this.messages = this.messages.filter(x =>{
        return x.recepteur.email == this.user.email;
      })
      console.log(this.messages);
      this.users = [...new Map(this.messages.map((item) => [item["email"], item])).values()];
      console.log(this.users);
    })
  }
  getDiscussion(user){
    this.opened = true;
    this.messageservice.getMessages().subscribe((res: Message[]) => {
      console.log(res);
      this.reponses = res.filter(x =>{
        return x.recepteur.email == this.user.email || x.emetteur.email == this.user.email;
      })
      this.reponses = this.reponses.sort(
        (objA, objB) => objB.date.getTime() - objA.date.getTime(),
      );
      console.log(this.reponses);
      
    })
  }
  add(){
    let message = {};
    message['texte']="bonjour";
    message['date'] = '18-03-2022';
    message['emetteur'] = this.user;
    message['recepteur'] = this.user;
    console.log(message);
    this.messageservice.addMessage(message);
  }

  ngAfterViewInit() {
    this.scrollEle.SimpleBar.getScrollElement().scrollTop = 100;
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 200;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  private _fetchData() {
    this.chatData = chatData;
    this.chatMessagesData = chatMessagesData;
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  chatUsername(name) {
    this.username = name;
    this.usermessage = 'Hello';
    this.chatMessagesData = [];
    const currentDate = new Date();

    this.chatMessagesData.push({
      name: this.username,
      message: this.usermessage,
      time: currentDate.getHours() + ':' + currentDate.getMinutes()
    });

  }

  /**
   * Save the message in chat
   */
  messageSave() {
    const message = this.formData.get('message').value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      this.chatMessagesData.push({
        align: 'right',
        name: 'Henry Wells',
        message,
        time: currentDate.getHours() + ':' + currentDate.getMinutes()
      });
      this.onListScroll();

      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null
      });
    }

    this.chatSubmit = true;
  }

}
