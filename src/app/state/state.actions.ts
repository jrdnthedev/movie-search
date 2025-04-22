import { createActionGroup, props } from '@ngrx/store';
import { Collection } from '../shared/models/collection.model';
import { Media } from '../shared/models/media.model';

export const collectionsActions = createActionGroup({
  source: 'Collections',
  events: {
    'Add Collection': props<{ collections: Collection }>(),
    'Remove Collection': props<{ id: number }>(),
    'Rename Collection': props<{ id: number; title: string }>(),
    'Add Movie To Collection': props<{ id: number; collections: Media }>(),
    'Remove Movie From Collection': props<{ id: number; collections: Media }>(),
    'Select Collection': props<{ id: number }>(),
  },
});
