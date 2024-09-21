import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { List } from '../../../types/types';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should add a new list to the current lists', () => {
    const initialLists: List[] = [
      { id: 1, name: 'First List', dateCreated: new Date(), items: [] },
    ];
    const newList: List = {
      id: 2,
      name: 'Second List',
      dateCreated: new Date(),
      items: [],
    };

    // Set up initial value
    service['listsSubject'].next({ items: initialLists });

    // Call the addList function
    service.addList(newList);

    // Subscribe to the observable and check the result
    service.lists$.subscribe((listsState) => {
      expect(listsState.items.length).toBe(2);
      expect(listsState.items).toContain(newList);
    });
  });

  it('should remove a list by its ID', () => {
    const listToRemoveId = 2;
    const initialLists: List[] = [
      { id: 1, name: 'First List', dateCreated: new Date(), items: [] },
      {
        id: listToRemoveId,
        name: 'Second List',
        dateCreated: new Date(),
        items: [],
      },
      { id: 3, name: 'Third List', dateCreated: new Date(), items: [] },
    ];

    // Set up initial value
    service['listsSubject'].next({ items: initialLists });

    // Call the removeList function
    service.removeList(listToRemoveId);

    // Subscribe to the observable and check the result
    service.lists$.subscribe((listsState) => {
      expect(listsState.items.length).toBe(2);
      expect(
        listsState.items.find((list) => list.id === listToRemoveId)
      ).toBeUndefined();
    });
  });

  it('should add an item to a list by its ID', () => {
    const initialLists: List[] = [
      { id: 1, name: 'test list', dateCreated: new Date(), items: [] },
    ];
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

    service['listsSubject'].next({ items: initialLists });

    service.addItemToList(1, newItem);

    service.lists$.subscribe((listsState) => {
      expect(listsState.items[0].items.length).toBe(1);
      expect(listsState.items[0].items).toContain(newItem);
    });
  });

  it('should remove an item by title from the specified list', () => {
    const listIdToModify = 1;
    const itemTitleToRemove = 1;

    const initialLists: List[] = [
      {
        id: listIdToModify,
        name: 'First List',
        dateCreated: new Date(),
        items: [
          {
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
          },
          {
            Title: 'test title',
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
          },
        ],
      },
      {
        id: 2,
        name: 'Second List',
        dateCreated: new Date(),
        items: [
          {
            Title: 'test title 2',
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
          },
          {
            Title: 'test title 3',
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
          },
        ],
      },
    ];

    // Set up initial state
    service['listsSubject'].next({ items: initialLists });

    // Call the removeItemFromList function
    service.removeItemFromList(listIdToModify, itemTitleToRemove);

    // Subscribe to the observable and check the result
    service.lists$.subscribe((listsState) => {
      const modifiedList = listsState.items.find(
        (list) => list.id === listIdToModify
      );
      const remainingItems = modifiedList?.items;

      // Expect the list to now contain only one item (Movie 2)
      expect(remainingItems?.length).toBe(1);
      expect(remainingItems).not.toContain(
        jasmine.objectContaining({ title: itemTitleToRemove })
      );
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
