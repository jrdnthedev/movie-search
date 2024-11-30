import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchText = output<string>();
  @Input() placeholderText = 'Search movies...';
  private searchSubject = new Subject<string>();

  ngOnInit() {
    console.log('SearchComponent initialized');
    this.searchSubject.pipe(debounceTime(1500)).subscribe((text) => {
      this.performSearch(text);
    });
  }

  searchMovies(text: string) {
    console.log('Searching movies', text);
    this.searchSubject.next(text);
  }

  performSearch(text: string) {
    this.searchText.emit(text);
  }
}
