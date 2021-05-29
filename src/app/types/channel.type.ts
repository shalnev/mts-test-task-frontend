export interface ChannelsResponse {
  total: string;
  channelDetails: Channel[];
}

export interface Channel {
  name: string;
  introduce: string;
  picture: Picture;
  genres: Genre[];
}

export interface Picture {
  hcsSlaveAddrs: [];
  extensionFields: [];
  backgrounds: string[];
  channelPics: string[];
  channelBlackWhites: string[];
  others: [];
}

export interface Genre {
  genreID: string;
  genreType: string;
  genreName: string;
}
