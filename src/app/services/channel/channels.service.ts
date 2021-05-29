import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel, ChannelsResponse } from '../../types/channel.type';
import { PaginationConfig, SORT } from '../../types/pagination.type';
import { filterByGenre, limitCountOfChannels, sortChannels } from './pagination-operation';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  private genreNames = new ReplaySubject<string[]>(1);

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  getChannels(paginationConfig: PaginationConfig): Observable<ChannelsResponse> {
    return this.loadChannels().pipe(tap((channels) => this.loadGenres(channels.channelDetails)), map(channelsResponse => ({
      total: channelsResponse.total,
      channelDetails: this.paginateChannels(channelsResponse.channelDetails, paginationConfig),
    })));
  }

  getGenres(): Observable<string[]> {
    return this.genreNames.asObservable();
  }

  loadMore() {
    let {take, sort, genreName} = this.activatedRoute.snapshot.queryParams;
    take = +this.activatedRoute.snapshot.queryParams.take + 12;
    const paginationConfig: PaginationConfig = {
      take,
      sort,
      genreName
    };
    this.saveParamsToUrl(paginationConfig);
  }

  private loadChannels(): Observable<ChannelsResponse> {
    return this.httpClient.get<ChannelsResponse>('/assets/channels.json');
  }

  private loadGenres(channels: Channel[]) {
    const rawGenreNames = [];
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].genres) {
        for (let k = 0; k < channels[i].genres.length; k++) {
          rawGenreNames.push(channels[i].genres[k].genreName);
        }
      }
    }
    this.genreNames.next(Array.from(new Set(rawGenreNames)));
  }

  private paginateChannels(channels: Channel[], paginationConfig: PaginationConfig): Channel[] {
    this.saveParamsToUrl(paginationConfig)
    return filterByGenre(sortChannels(
      limitCountOfChannels(channels, paginationConfig.take),
      paginationConfig.sort), paginationConfig.genreName);
  }

  private saveParamsToUrl(paginationConfig: PaginationConfig) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: paginationConfig,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      },
    );
  }
}
