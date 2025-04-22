import { Media } from './media.model';

export interface Collection {
  list: Media[];
  title: string;
  id: number;
}
