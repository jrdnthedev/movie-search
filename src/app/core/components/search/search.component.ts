import { Component, Input, output } from '@angular/core';
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
    this.searchSubject.pipe(debounceTime(1000)).subscribe((text) => {
      this.searchText.emit(text);
    });
  }

  performSearch(text: string) {
    this.searchSubject.next(text);
  }
}
