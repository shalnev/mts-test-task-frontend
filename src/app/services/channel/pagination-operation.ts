import { Channel } from '../../types/channel.type';
import { SORT } from '../../types/pagination.type';

export function sortChannels(channels: Channel[], sort: SORT): Channel[] {
  if (sort === SORT.ASC) {
    return channels.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === SORT.DESC) {
    return channels.sort((a, b) => b.name.localeCompare(a.name));
  }
  return channels;
}

export function limitCountOfChannels(channels: Channel[], take: number): Channel[] {
  return channels.slice(0, take);
}

export function filterByGenre(channels: Channel[], genreName: string): Channel[] {
  if (genreName === 'default') {
    return channels;
  } else {
    return channels.filter(channel => channel.genres.some(genre => genre.genreName === genreName));
  }
}
