import { Component, inject, Input, output } from '@angular/core';
import { Movie } from '../../../types/types';
import { FavouritesService } from '../../services/favourites/favourites.service';

@Component({
    selector: 'app-like',
    imports: [],
    templateUrl: './like.component.html',
    styleUrl: './like.component.scss'
})
export class LikeComponent {
  isLiked = false;
  private favourite = inject(FavouritesService);
  @Input() item!: Movie;

  ngOnInit() {
    this.isLiked = this.item.favourite || false;
  }
  toggleLike(item: Movie) {
    this.isLiked = !this.isLiked;
    console.log('Like status: ', this.isLiked, item);
    item.favourite = this.isLiked;
    if (this.isLiked) {
      this.favourite.addFavourite(item);
    } else {
      this.favourite.removeFavourite(item.imdbID);
    }
  }
}
