import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();
  messageAction(name: string) {
    this.messageSource.next(name);
  }
  constructor() { }
}
