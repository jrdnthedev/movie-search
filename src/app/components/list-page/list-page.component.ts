import { Component, inject } from '@angular/core';
import { StoreService } from '../../core/services/store/store.service';
import { List, Movie } from '../../types/types';
import { SubscriptionLike } from 'rxjs';
import { LikeComponent } from '../../core/components/like/like.component';
import { FavouritesService } from '../../core/services/favourites/favourites.service';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [LikeComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {
  list: List[] = [];
  subscription!: SubscriptionLike;
  private store = inject(StoreService);
  private favourite = inject(FavouritesService);

  ngOnInit() {
    console.log('List page component initialized');
    this.subscription = this.store.lists$.subscribe((lists) => {
      console.log('Lists: ', lists);
      this.list = lists;
    });

    this.favourite.favourites$.subscribe((favourites) => {
      console.log('Favourites: ', favourites);
    });
  }

  deleteItem(id: number, index: number) {
    console.log('Deleting item', index);
    this.store.removeItemFromList(id, index);
  }

  deleteList(id: number) {
    console.log('Deleting list');
    this.store.removeList(id);
  }

  ngOnDestroy() {
    console.log('List page component destroyed');
    this.subscription.unsubscribe();
  }
}
