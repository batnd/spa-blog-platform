import {Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from '../../../../types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors')
  public backendErrorsProps: BackendErrorsInterface;
  public errorMessages: string[];
  ngOnInit(): void {
    // For public API
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string): string => {
      const messages: string = this.backendErrorsProps[name].join(', ');
      return `${name} ${messages}`;
    });

    // For local API
    // this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
    //   const messages: string = this.backendErrorsProps[name].join(', ').trim();
    //   return `${messages}`;
    // });
  }
}
