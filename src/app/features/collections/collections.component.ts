import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-collections',
  imports: [CardComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent {}
