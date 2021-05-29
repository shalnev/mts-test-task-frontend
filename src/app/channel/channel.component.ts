import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Channel } from '../types/channel.type';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelComponent {

  @Input() channel: Channel;

  constructor() { }

}
