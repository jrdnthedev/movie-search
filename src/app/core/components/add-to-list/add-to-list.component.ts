import { Component, Input } from '@angular/core';
import { List, Movie } from '../../../types/types';
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
  @Input() movie!: Movie;

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
    if (this.selectedItems.includes(id)) {
      this.selectedItems = this.selectedItems.filter((item) => item !== id);
    } else {
      this.selectedItems.push(id);
    }
    console.log('Test', this.selectedItems, this.movie);
  }

  add() {
    this.selectedItems.forEach((id) => {
      this.store.addItemToList(id, this.movie);
    });
    this.selectedItems = [];
    this.closeDialog();
  }

  closeDialog() {
    document.getElementsByTagName('dialog')[0].close();
  }
}
