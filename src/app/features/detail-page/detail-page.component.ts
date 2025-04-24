import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCollectionById } from '../../state/state.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  imports: [CommonModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
})
export class DetailPageComponent {
  itemId: string | null = null;
  private readonly route = inject(ActivatedRoute);
  private store = inject(Store);
  collection$!: Observable<any>;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
      this.collection$ = this.store.select<any>(
        selectCollectionById(Number(this.itemId))
      );
    });
  }

  goBack() {
    window.history.back();
  }
}
