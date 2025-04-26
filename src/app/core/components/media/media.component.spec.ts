import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesComponent } from './media.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../services/movies/movies.service';
import { of } from 'rxjs';
import { AddToListComponent } from '../add-to-list/add-to-list.component';
import { ViewContainerRef } from '@angular/core';
import { Movie } from '../../../types/types';

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
  // const movieTitle = 'titanic';
  let viewContainerRefSpy: jasmine.SpyObj<ViewContainerRef>;
  let movieMock: Movie;

  beforeEach(async () => {
    viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', [
      'createComponent',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MoviesComponent,
        AddToListComponent,
      ],
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
        { provide: ViewContainerRef, useValue: viewContainerRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
    component.vcr = viewContainerRefSpy;
    fixture.detectChanges();
  });

  it('should create AddToListComponent when myLists is not empty', () => {
    component.myLists = [
      {
        id: 1,
        name: 'ma',
        dateCreated: new Date(),
        items: [mockMoveDataFalse],
      },
    ]; // Ensure the list is not empty
    const componentRefSpy = jasmine.createSpyObj('ComponentRef', ['setInput']);
    viewContainerRefSpy.createComponent.and.returnValue(componentRefSpy);

    component.addToList(mockMoveDataFalse); // Call the function

    expect(viewContainerRefSpy.createComponent).toHaveBeenCalledWith(
      AddToListComponent as any
    );
    expect(componentRefSpy.setInput).toHaveBeenCalledWith(
      'movie',
      mockMoveDataFalse
    );
    expect(componentRefSpy.setInput).toHaveBeenCalledWith(
      'compRef',
      componentRefSpy
    );
  });

  it('should log "No lists available" when myLists is empty', () => {
    component.myLists = []; // Ensure the list is empty
    spyOn(console, 'log'); // Spy on console.log

    component.addToList(mockMoveDataFalse); // Call the function

    expect(viewContainerRefSpy.createComponent).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('No lists available');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
