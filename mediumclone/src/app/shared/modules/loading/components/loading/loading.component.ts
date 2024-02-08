import {Component, Input} from '@angular/core';

@Component({
  selector: 'mc-loading',
  template: '<div>Loading {{messageProps}}...</div>',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input('message')
  public messageProps: string = 'something';
}
