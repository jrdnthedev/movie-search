import { createReducer, on } from '@ngrx/store';
import { Collection } from '../shared/models/collection.model';
import { collectionsActions } from './state.actions';

interface State {
  collections: Collection[];
}
const initialState: State = {
  collections: [],
};

export const stateReducer = createReducer(
  initialState,
  on(collectionsActions.addCollection, (state, { collections }) => ({
    ...state,
    collections: [...state.collections, collections],
  })),
  on(collectionsActions.removeCollection, (state, { id }) => ({
    ...state,
    list: state.collections.filter((collection) => collection.id !== id),
  })),
  on(collectionsActions.renameCollection, (state, { id, title }) => ({
    ...state,
    collections: state.collections.map((collection) =>
      collection.id === id ? { ...collection, title } : collection
    ),
  })),
  on(collectionsActions.addMovieToCollection, (state, { id, collections }) => ({
    ...state,
    collections: state.collections.map((collection) =>
      collection.id === id
        ? {
            ...collection,
            list: [...collection.list, collections],
          }
        : collection
    ),
  })),
  on(
    collectionsActions.removeMovieFromCollection,
    (state, { id, collections }) => ({
      ...state,
      collections: state.collections.map((collection) =>
        collection.id === id
          ? {
              ...collection,
              list: collection.list.filter(
                (movie) => movie.imdbID !== collections.imdbID
              ),
            }
          : collection
      ),
    })
  ),
  on(collectionsActions.selectCollection, (state, { id }) => ({
    ...state,
    list: state.collections.map((collection) =>
      collection.id === id
        ? { ...collection, selected: true }
        : { ...collection, selected: false }
    ),
  }))
);
