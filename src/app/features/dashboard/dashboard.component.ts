import { Component } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component';
import { SearchComponent } from '../../core/components/search/search.component';
import { MediaComponent } from '../../core/components/media/media.component';

@Component({
  selector: 'app-dashboard',
  imports: [CollectionsComponent, SearchComponent, MediaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  searchText = '';

  getSearchText(text: string) {
    this.searchText = text;
  }
}
