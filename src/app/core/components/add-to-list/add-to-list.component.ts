import { Component, ComponentRef, Input } from '@angular/core';
import { List, Movie } from '../../../types/types';
import { StoreService } from '../../services/store/store.service';
import { SubscriptionLike } from 'rxjs';

@Component({
    selector: 'app-add-to-list',
    imports: [],
    templateUrl: './add-to-list.component.html',
    styleUrl: './add-to-list.component.scss'
})
export class AddToListComponent {
  myLists: List[] = [];
  selectedItems: number[] = [];
  checkedItems: HTMLInputElement[] = [];
  subscription!: SubscriptionLike;
  @Input() movie!: Movie;
  @Input() compRef!: ComponentRef<AddToListComponent>;

  constructor(private store: StoreService) {}

  ngOnInit() {
    console.log('AddToListComponent initialized');
    this.subscription = this.store.lists$.subscribe((lists) => {
      console.log('Lists: ', lists);
      this.myLists = lists;
    });
    console.log(this.movie);
    document.getElementsByTagName('dialog')[0].showModal();
  }

  setSelectedItems(e: Event) {
    const id = Number((e.target as HTMLInputElement).value);
    if (this.selectedItems.includes(id)) {
      this.selectedItems = this.selectedItems.filter((item) => item !== id);
    } else {
      this.selectedItems.push(id);
      this.checkedItems.push(e.target as HTMLInputElement);
    }
    console.log('Test', this.selectedItems, this.movie);
  }

  addItemToList() {
    this.selectedItems.forEach((id) => {
      this.store.addItemToList(id, this.movie);
    });
    this.selectedItems = [];
    this.checkedItems.forEach((item) => (item.checked = false));
    this.closeDialog();
  }

  closeDialog() {
    document.getElementsByTagName('dialog')[0].close();
    this.compRef.destroy();
  }
  ngOnDestroy() {
    console.log('AddToListComponent destroyed');
    this.subscription.unsubscribe();
  }
}
