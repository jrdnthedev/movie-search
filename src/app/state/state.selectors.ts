import { createSelector } from '@ngrx/store';
import { Collection } from '../shared/models/collection.model';
import { createFeatureSelector } from '@ngrx/store';

interface AppState {
  collections: Collection[];
}

export const selectFeatureState = createFeatureSelector<AppState>('state');

export const selectCollectionById = (id: number) =>
  createSelector(selectFeatureState, (collections) =>
    collections.collections.find((collection) => collection.id === id)
  );

export const selectAllCollections = createSelector(
  selectFeatureState,
  (collections) => collections.collections
);
export const selectCollectionMovies = (id: number) =>
  createSelector(selectAllCollections, (collections) => {
    const collection = collections.find((collection) => collection.id === id);
    return collection ? collection.list : [];
  });
export const selectCollectionCount = createSelector(
  selectAllCollections,
  (collections) => collections.length
);
