import { TestBed } from '@angular/core/testing';

import { FavouritesService } from './favourites.service';

describe('FavouritesService', () => {
  let service: FavouritesService;
  const newItem = {
    Title: 'Do the Right Thing',
    Year: '1989',
    Rated: 'R',
    Released: '21 Jul 1989',
    Runtime: '120 min',
    Genre: 'Comedy, Drama',
    Director: 'Spike Lee',
    Writer: 'Spike Lee',
    Actors: 'Danny Aiello, Ossie Davis, Ruby Dee',
    Plot: "On the hottest day of the year on a street in the Bedford-Stuyvesant section of Brooklyn, everyone's hate and bigotry smolders and builds until it explodes into violence.",
    Language: 'English, Italian, Spanish, Korean',
    Country: 'United States',
    Awards: 'Nominated for 2 Oscars. 21 wins & 19 nominations total',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BODA2MjU1NTI1MV5BMl5BanBnXkFtZTgwOTU4ODIwMjE@._V1_SX300.jpg',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '8.0/10' },
      { Source: 'Rotten Tomatoes', Value: '92%' },
      { Source: 'Metacritic', Value: '93/100' },
    ],
    Metascore: '93',
    imdbRating: '8.0',
    imdbVotes: '114,282',
    imdbID: 'tt0097216',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: '$27,545,445',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesService);
  });

  it('should get favourites', () => {
    expect(service.getFavourites()).toEqual([]);
  });

  it('should set favourites', () => {
    service.setFavourites([]);
    expect(service.getFavourites()).toEqual([]);
  });

  it('should add favourite', () => {
    service.addFavourite(newItem);
    expect(service.getFavourites()).toEqual([newItem]);
  });

  it('should remove favourite', () => {
    service.setFavourites([{ imdbID: '1' } as any]);
    service.removeFavourite('1');
    expect(service.getFavourites()).toEqual([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
