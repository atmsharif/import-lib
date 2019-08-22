import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SystemError } from 'client-model';

@Component({
  selector: 'lib-error-message',
  templateUrl: `./error-message.component.html`,
  styles: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input() systemError: SystemError;

  constructor() {  

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.error(this.systemError.originalError);
  }
}
