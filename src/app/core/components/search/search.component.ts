import { Component, Input, output } from '@angular/core';

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

  performSearch(text: string) {
    this.searchText.emit(text);
  }
}
