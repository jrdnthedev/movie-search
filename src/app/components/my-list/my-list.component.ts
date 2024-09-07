import { Component, Input } from '@angular/core';
import { List } from '../../types/types';

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class MyListComponent {
  @Input() items: List[] = [];
}
