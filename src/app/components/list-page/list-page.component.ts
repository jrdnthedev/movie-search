import { Component } from '@angular/core';
import { StoreService } from '../../core/services/store/store.service';
import { List } from '../../types/types';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {
  list: List[] = [];
  subscription!: SubscriptionLike;

  constructor(private store: StoreService) {}

  ngOnInit() {
    console.log('List page component initialized');
    this.subscription = this.store.getLists().subscribe((lists) => {
      console.log('Lists: ', lists.items);
      this.list = lists.items;
    });
  }

  deleteItem(id: number, title: string) {
    console.log('Deleting item');
    this.store.removeItemFromList(id, title);
  }
  ngOnDestroy() {
    console.log('List page component destroyed');
    this.subscription.unsubscribe();
  }
}