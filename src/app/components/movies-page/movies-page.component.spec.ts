import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesPageComponent } from './movies-page.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesPageComponent', () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesPageComponent, HttpClientTestingModule],
      providers: [HttpClient],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update searchText and log the input text', () => {
    const inputText = 'Test';

    spyOn(console, 'log'); // Spy on console.log

    component.getSearchText(inputText);

    // Assert that searchText is updated correctly
    expect(component.searchText).toBe(inputText);

    // Assert that console.log was called with the correct text
    expect(console.log).toHaveBeenCalledWith('Search text: ', inputText);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
