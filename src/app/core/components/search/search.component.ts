import { Component, Input, output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
})
export class SearchComponent {
  searchText = output<string>();
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
