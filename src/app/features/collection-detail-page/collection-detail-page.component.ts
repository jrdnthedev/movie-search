import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCollectionById } from '../../state/state.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Collection } from '../../shared/models/collection.model';

@Component({
  selector: 'app-collection-detail-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './collection-detail-page.component.html',
  styleUrl: './collection-detail-page.component.scss',
})
export class CollectionDetailPageComponent {
  itemId: string | null = null;
  private readonly route = inject(ActivatedRoute);
  private store = inject(Store);
  collection$!: Observable<Collection>;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
      this.collection$ = this.store.select<any>(
        selectCollectionById(Number(this.itemId))
      );
    });
  }

  removeMovieFromCollection(id: number) {
    this.store.dispatch({
      type: '[Collections] Remove Movie From Collection',
      id: id,
      collections: {
        Title: 'Inception',
        Year: '2010',
        imdbID: 'tt1375666',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMjAxMjg0OTY2OF5BMl5BanBnXkFtZTcwNjQ3NzYyMw@@._V1_SX300.jpg',
      },
    });
  }

  goBack() {
    window.history.back();
  }
}
