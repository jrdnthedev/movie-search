import { Component } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component';
import { SearchComponent } from '../../core/components/search/search.component';
import { MoviesComponent } from '../../core/components/movies/movies.component';

@Component({
  selector: 'app-dashboard',
  imports: [CollectionsComponent, SearchComponent, MoviesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  searchText = '';

  getSearchText(text: string) {
    this.searchText = text;
  }
}
