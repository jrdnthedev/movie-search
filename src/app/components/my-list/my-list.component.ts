import { Component, inject, Input } from '@angular/core';
import { List } from '../../types/types';
import { StoreService } from '../../core/services/store/store.service';

@Component({
    selector: 'app-my-list',
    imports: [],
    templateUrl: './my-list.component.html',
    styleUrl: './my-list.component.scss'
})
export class MyListComponent {
  @Input() items: List[] = [];
  private store = inject(StoreService);

  deleteList(listId: number) {
    this.store.removeList(listId);
  }
}
