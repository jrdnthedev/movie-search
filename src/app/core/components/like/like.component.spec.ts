import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeComponent } from './like.component';
import { FavouritesService } from '../../services/favourites/favourites.service';

describe('LikeComponent', () => {
  let component: LikeComponent;
  let fixture: ComponentFixture<LikeComponent>;
  let favouritesServiceSpy: jasmine.SpyObj<FavouritesService>;
  const mockMovie: any = {
    imdbID: 'tt1234567',
    Title: 'Test Movie',
    favourite: false,
  };

  beforeEach(async () => {
    favouritesServiceSpy = jasmine.createSpyObj('FavouritesService', [
      'addFavourite',
      'removeFavourite',
    ]);

    await TestBed.configureTestingModule({
      imports: [LikeComponent],
      providers: [
        { provide: FavouritesService, useValue: favouritesServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set isLiked to the value of item.favourite on initialization', () => {
    component.item.favourite = true;
    component.ngOnInit();
    expect(component.isLiked).toBeTrue();

    component.item.favourite = false;
    component.ngOnInit();
    expect(component.isLiked).toBeFalse();
  });

  it('should toggle isLiked and call addFavourite when toggled to liked', () => {
    component.isLiked = false; // Initial state
    component.toggleLike(mockMovie);

    expect(component.isLiked).toBeTrue();
    expect(mockMovie.favourite).toBeTrue();
    expect(favouritesServiceSpy.addFavourite).toHaveBeenCalledWith(mockMovie);
    expect(favouritesServiceSpy.removeFavourite).not.toHaveBeenCalled();
  });

  it('should toggle isLiked and call removeFavourite when toggled to unliked', () => {
    component.isLiked = true; // Initial state
    component.toggleLike(mockMovie);

    expect(component.isLiked).toBeFalse();
    expect(mockMovie.favourite).toBeFalse();
    expect(favouritesServiceSpy.removeFavourite).toHaveBeenCalledWith(
      mockMovie.imdbID
    );
    expect(favouritesServiceSpy.addFavourite).not.toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
