import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesPageComponent } from './movies-page.component';
import { provideHttpClient } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MoviesPageComponent', () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call performSearch after 1 second when getSearchText is called', fakeAsync(() => {
    spyOn(component, 'performSearch'); // Spy on performSearch method

    const mockText = 'test search';
    component.getSearchText(mockText);

    // Advance time by less than debounce time and check that performSearch is not called
    tick(500);
    expect(component.performSearch).not.toHaveBeenCalled();

    // Advance time to exceed debounce time
    tick(500);
    expect(component.performSearch).toHaveBeenCalledWith(mockText);
  }));

  it('should update searchText when performSearch is called', () => {
    const mockText = 'test search';

    component.performSearch(mockText);

    expect(component.searchText).toBe(mockText);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
