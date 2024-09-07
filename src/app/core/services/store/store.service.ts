import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List, Lists, Movie } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private listsSubject = new BehaviorSubject<Lists>({ items: [] });
  lists$ = this.listsSubject.asObservable();
  listId = 0;

  constructor() {}

  getLists() {
    return this.lists$.pipe();
  }

  addList(list: List) {
    const currentLists = this.listsSubject.value.items;
    this.listsSubject.next({ items: [...currentLists, list] });
  }

  removeList(listId: number) {
    const currentLists = this.listsSubject.value.items.filter(
      (list) => list.id !== listId
    );
    // Wrap the filtered list in the Lists object structure
    this.listsSubject.next({ items: currentLists });
  }

  addItemToList(listId: number, item: Movie) {
    const currentLists = this.listsSubject.value.items.map((list) =>
      list.id === listId ? { ...list, items: [...list.items, item] } : list
    );
    this.listsSubject.next({ items: currentLists });
  }

  removeItemFromList(listId: number, itemTitle: string) {
    const currentLists = this.listsSubject.value.items.map((list) =>
      list.id === listId
        ? {
            ...list,
            items: list.items.filter((item) => item.Title !== itemTitle),
          }
        : list
    );
    this.listsSubject.next({ items: currentLists });
  }
}
