import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List, Movie } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favouriteSubject = new BehaviorSubject<Movie[]>([]);
  favourites$ = this.favouriteSubject.asObservable();

  constructor() {}

  getFavourites() {
    return this.favouriteSubject.value;
  }

  setFavourites(favourites: Movie[]) {
    this.favouriteSubject.next(favourites);
  }

  addFavourite(favourite: Movie) {
    const currentFavourites = this.getFavourites().concat(favourite);
    this.setFavourites(currentFavourites);
  }

  removeFavourite(favouriteId: string) {
    const currentLists = this.favouriteSubject.value.filter(
      (item) => item.imdbID !== favouriteId
    );
    this.setFavourites(currentLists);
  }
}
