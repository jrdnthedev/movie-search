import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let cacheSpy: jasmine.Spy;

  const apiKey = 'a658a848';
  const title = 'Inception';
  const mockData = { Title: 'Inception', Year: '2010' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MoviesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    cacheSpy = spyOn(service['cache'], 'get').and.callThrough();
    spyOn(service['cache'], 'set').and.callThrough();
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensures no unmatched HTTP requests
  });

  it('should return cached data if available', () => {
    service['cache'].set(title, mockData);
    // Call the service method
    service.getMovies(title).subscribe({
      next: (response) => {
        // Expect the response to match the mock data
        expect(response).withContext('expected movies').toEqual(mockData);
        expect(cacheSpy).toHaveBeenCalledWith(title);
      },
      error: (error) => {
        console.error(error);
      },
    });

    httpTestingController.expectNone(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`
    );
  });

  it('should fetch data via HTTP if not cached and cache the result', () => {
    service.getMovies(title).subscribe((data) => {
      expect(data).toEqual(mockData);
      expect(service['cache'].set).toHaveBeenCalledWith(title, mockData); // Verify cache.set was called
    });

    // Simulate HTTP request
    const req = httpTestingController.expectOne(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Respond with mock data
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
