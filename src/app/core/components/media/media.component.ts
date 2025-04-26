import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { filter, SubscriptionLike } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllCollections } from '../../../state/state.selectors';
import { CommonModule } from '@angular/common';
import { Media } from '../../../shared/models/media.model';

@Component({
  selector: 'app-media',
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss',
  standalone: true,
})
export class MediaComponent {
  private store = inject(Store);
  collections$ = this.store.select(selectAllCollections);
  subscription: SubscriptionLike[] = [];
  media!: Media;
  @Input() movieTitle = '';
  showDropdown = false;
  constructor(private movies: MoviesService, public vcr: ViewContainerRef) {}

  ngOnInit() {
    console.log('MoviesComponent initialized');
  }

  ngOnChanges() {
    this.searchMovies(this.movieTitle);
  }

  addMovieToCollection(media: Media, listId: number) {
    this.store.dispatch({
      type: '[Collections] Add Movie To Collection',
      id: listId,
      collections: {
        Title: media.Title,
        Year: media.Year,
        imdbID: media.imdbID,
        Type: media.Type,
        Poster: media.Poster,
      },
    });
  }

  searchMovies(text: string) {
    console.log('Searching movies', text);
    if (!text) {
      console.log('No text to search for');
      return;
    }
    this.subscription.push(
      this.movies
        .getMovies(text)
        .pipe(
          filter((data: Media) => {
            if (data.Response === 'True') {
              return true;
            } else {
              console.log('No movies found');
              return false;
            }
          })
        )
        .subscribe((data: Media) => {
          this.media = data;
          console.log('Movies found', data);
        })
    );
  }

  ngOnDestroy() {
    console.log('MoviesComponent destroyed');
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
