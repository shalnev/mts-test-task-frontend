import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Channel } from '../types/channel.type';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelComponent implements OnInit {

  @Input() channel: Channel;

  constructor() { }

  ngOnInit(): void {
  }

}
