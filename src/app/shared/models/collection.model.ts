import { Media } from './media.model';

export interface Collection {
  list: Media[];
  title: string;
  description?: string;
  id: number;
}
