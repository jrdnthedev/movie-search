import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List, Movie } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favouriteSubject = new BehaviorSubject<List[]>([]);
  favourites$ = this.favouriteSubject.asObservable();

  constructor() {}

  getFavourites() {
    return this.favouriteSubject.value;
  }

  setFavourites(favourites: List[]) {
    this.favouriteSubject.next(favourites);
  }

  addFavourite(favourite: List) {
    const currentFavourites = this.getFavourites().concat(favourite);
    this.setFavourites(currentFavourites);
  }

  removeFavourite(favouriteId: number, idx: number) {
    const currentLists = this.favouriteSubject.value.map((favourite) =>
      favourite.id === favouriteId
        ? {
            ...favourite,
            items: favourite.items.filter((item, index) => index !== idx),
          }
        : favourite
    );
    this.setFavourites(currentLists);
  }
}
