export enum SORT {
  DEFAULT = 'default',
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationConfig {
  take: number;
  sort: SORT;
  genreName: string;
}
