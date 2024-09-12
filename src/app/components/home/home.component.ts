import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyListComponent } from '../my-list/my-list.component';
import { StoreService } from '../../core/services/store/store.service';
import { FormsModule, NgForm } from '@angular/forms';
import { List } from '../../types/types';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MyListComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  list: List[] = [];
  subscription!: SubscriptionLike;

  constructor(private store: StoreService) {}

  ngOnInit() {
    console.log('Home component initialized');
    this.subscription = this.store.getLists().subscribe((lists) => {
      console.log('Lists: ', lists.items);
      this.list = lists.items;
    });
  }

  createList(name: string, form: NgForm) {
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
    this.subscription.unsubscribe();
  }
}
