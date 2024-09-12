import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesComponent } from './movies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../services/movies/movies.service';
import { of } from 'rxjs';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;
  const mockMoveData = {
    Title: 'Titanic',
    Year: '1997',
    Rated: 'PG-13',
    Released: '19 Dec 1997',
    Runtime: '194 min',
    Genre: 'Drama, Romance',
    Director: 'James Cameron',
    Writer: 'James Cameron',
    Actors: 'Leonardo DiCaprio, Kate Winslet, Billy Zane',
    Plot: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    Language: 'English, Swedish, Italian, French',
    Country: 'United States, Mexico',
    Awards: 'Won 11 Oscars. 126 wins & 83 nominations total',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '7.9/10' },
      { Source: 'Rotten Tomatoes', Value: '88%' },
      { Source: 'Metacritic', Value: '75/100' },
    ],
    Metascore: '75',
    imdbRating: '7.9',
    imdbVotes: '1,298,561',
    imdbID: 'tt0120338',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: '$674,292,608',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True',
  };

  const mockMoveDataFalse = {
    Title: 'Titanic',
    Year: '1997',
    Rated: 'PG-13',
    Released: '19 Dec 1997',
    Runtime: '194 min',
    Genre: 'Drama, Romance',
    Director: 'James Cameron',
    Writer: 'James Cameron',
    Actors: 'Leonardo DiCaprio, Kate Winslet, Billy Zane',
    Plot: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    Language: 'English, Swedish, Italian, French',
    Country: 'United States, Mexico',
    Awards: 'Won 11 Oscars. 126 wins & 83 nominations total',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
    Ratings: [
      { Source: 'Internet Movie Database', Value: '7.9/10' },
      { Source: 'Rotten Tomatoes', Value: '88%' },
      { Source: 'Metacritic', Value: '75/100' },
    ],
    Metascore: '75',
    imdbRating: '7.9',
    imdbVotes: '1,298,561',
    imdbID: 'tt0120338',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: '$674,292,608',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'False',
  };
  const movieTitle = 'titanic';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MoviesComponent],
      providers: [
        MoviesService,
        {
          provide: MoviesService,
          useValue: {
            getMovies: jasmine
              .createSpy('getMovies')
              .and.returnValue(of(mockMoveData)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should call getMovies and set movie when response is true', () => {
    component.getMovies(movieTitle);

    // Verify that getMovies was called
    expect(moviesService.getMovies).toHaveBeenCalledWith(movieTitle);

    // Since the service returns an observable with `Response: 'True'`, the movie should be set
    expect(component.movie).toEqual(mockMoveData);
  });

  it('should not set movie when response is false', () => {
    (moviesService.getMovies as jasmine.Spy).and.returnValue(
      of(mockMoveDataFalse)
    );

    // Call the component method
    component.getMovies(movieTitle);

    // Since the response is `False`, the movie should not be set
    expect(component.movie).toBeUndefined();
  });

  it('should call getMovies with the correct arguments when searchMovies is called', () => {
    spyOn(component, 'getMovies');

    // Call the searchMovies method
    component.searchMovies(movieTitle);

    // Expect getMovies to have been called with the correct argument
    expect(component.getMovies).toHaveBeenCalledWith(movieTitle);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
