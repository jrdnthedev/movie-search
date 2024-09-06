import { Component, Input } from '@angular/core';
import { Movie } from '../../types/types';

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class MyListComponent {
  @Input() items: Movie[] = [];
}
