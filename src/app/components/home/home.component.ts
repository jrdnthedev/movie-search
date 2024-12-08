import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyListComponent } from '../my-list/my-list.component';
import { StoreService } from '../../core/services/store/store.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Favourite, List, Movie } from '../../types/types';
import { map, SubscriptionLike, take, tap } from 'rxjs';
import { SearchComponent } from '../../core/components/search/search.component';
import { FavouritesService } from '../../core/services/favourites/favourites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MyListComponent, FormsModule, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  list: List[] = [];
  subscription: SubscriptionLike[] = [];
  searchText = '';
  favourites: Favourite[] = [];
  private favoriteService = inject(FavouritesService);

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.subscription.push(
      this.store.lists$.subscribe((lists) => {
        this.list = lists;
      })
    );

    this.subscription.push(
      this.favoriteService.favourites$
        .pipe(map((favourites) => favourites.slice(0, 3)))
        .subscribe((favourites) => {
          this.favourites = favourites;
        })
    );
  }

  getSearchText(text: string) {
    this.searchText = text;
  }
  createList(name: string, form: NgForm) {
    console.log('Name: ', name);
    if (name)
      this.store.addList({
        id: this.store.listId++, // Increment the listId property
        name: name,
        dateCreated: new Date(),
        items: [],
      });
    form.reset();
  }

  ngOnDestroy() {
    console.log('Home component destroyed');
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
