import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ChannelsService } from '../services/channel/channels.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  readonly paginationConfig = this.router.events.pipe(
    filter((event): event is RoutesRecognized => !!event && event instanceof RoutesRecognized),
    map(event => event.state.root.queryParams));

  readonly genreNames = this.channelsService.getGenres();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private channelsService: ChannelsService,
  ) { }

  changePagination() {
    // TODO
  }
}
