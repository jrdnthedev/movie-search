import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List, Lists, Movie } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private listsSubject = new BehaviorSubject<List[]>([]);
  lists$ = this.listsSubject.asObservable();
  listId = 0;

  constructor() {}

  getLists() {
    return this.listsSubject.value;
  }

  setLists(lists: List[]) {
    this.listsSubject.next(lists);
  }

  addList(list: List) {
    const currentLists = this.getLists().concat(list);
    console.log('Current lists: ', currentLists);
    this.setLists(currentLists);
  }

  removeList(listId: number) {
    const currentLists = this.listsSubject.value.filter(
      (list) => list.id !== listId
    );
    // Wrap the filtered list in the Lists object structure
    this.setLists(currentLists);
  }

  addItemToList(listId: number, item: Movie) {
    const currentLists = this.listsSubject.value.map((list) =>
      list.id === listId ? { ...list, items: [...list.items, item] } : list
    );
    this.setLists(currentLists);
  }

  removeItemFromList(listId: number, idx: number) {
    const currentLists = this.listsSubject.value.map((list) =>
      list.id === listId
        ? {
            ...list,
            items: list.items.filter((item, index) => index !== idx),
          }
        : list
    );
    this.setLists(currentLists);
  }
}
