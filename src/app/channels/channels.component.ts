import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChannelsService } from '../services/channel/channels.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { PaginationConfig, SORT } from '../types/pagination.type';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsComponent {
  readonly INITIAL_PAGINATION_CONFIG: PaginationConfig = {
    take: 24,
    sort: SORT.DEFAULT,
    genreName: 'default'
  };

  readonly channelsData= this.router.events.pipe(
    filter((event): event is RoutesRecognized => !!event && event instanceof RoutesRecognized),
    map(event => {
      const {take, sort, genreName} = event.state.root.queryParams;
      if (take && sort && genreName) {
        return {take, sort, genreName};
      } else {
        return this.INITIAL_PAGINATION_CONFIG;
      }
    }),
    switchMap((paginationConfig: PaginationConfig) => this.channelsService.getChannels(paginationConfig)));

  constructor(
    private channelsService: ChannelsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  loadMore() {
    this.channelsService.loadMore();
  }
}
