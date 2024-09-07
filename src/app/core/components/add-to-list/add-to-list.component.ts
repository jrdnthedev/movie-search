import { Component } from '@angular/core';
import { List } from '../../../types/types';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-add-to-list',
  standalone: true,
  imports: [],
  templateUrl: './add-to-list.component.html',
  styleUrl: './add-to-list.component.scss',
})
export class AddToListComponent {
  myLists: List[] = [];
  selectedItems: number[] = [];

  constructor(private store: StoreService) {}

  ngOnInit() {
    console.log('AddToListComponent initialized');
    this.store.getLists().subscribe((lists) => {
      console.log('Lists: ', lists.items);
      this.myLists = lists.items;
    });
    document.getElementsByTagName('dialog')[0].showModal();
  }

  test(id: number) {
    this.selectedItems.push(id);
    console.log('Test', this.selectedItems);
  }

  closeDialog() {
    document.getElementsByTagName('dialog')[0].close();
  }
}
