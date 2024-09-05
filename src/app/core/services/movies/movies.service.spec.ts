import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;
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
  const movieTitle = 'titanic';
  const apiKey = 'a658a848';
  const imdbId = 'tt0120338';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService, HttpClient],
    });
    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should fetch movies based on title', () => {
    // Replace with actual key or mock value

    // Call the service method
    service.getMovies(movieTitle).subscribe((response) => {
      // Expect the response to match the mock data
      expect(response).toEqual(mockMoveData);
    });

    // Expect an HTTP GET request to the correct URL
    const req = httpTestingController.expectOne(
      `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`
    );

    // Ensure that it was a GET request
    expect(req.request.method).toBe('GET');

    // Respond with the mock data
    req.flush(mockMoveData);
  });

  it('should fetch movies based on imdb id', () => {
    service.getMoviesByImdbId(imdbId).subscribe((response) => {
      // Expect the response to match the mock data
      expect(response).toEqual(mockMoveData);
    });

    // Expect an HTTP GET request to the correct URL
    const req = httpTestingController.expectOne(
      `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`
    );

    // Ensure that it was a GET request
    expect(req.request.method).toBe('GET');

    // Respond with the mock data
    req.flush(mockMoveData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
