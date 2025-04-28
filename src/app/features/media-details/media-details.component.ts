import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from '../../shared/models/media.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-media-details',
  imports: [],
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss',
})
export class MediaDetailsComponent {
  itemId: string | null = null;
  private readonly route = inject(ActivatedRoute);
  private store = inject(Store);
  media$!: Observable<Media>;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id');
    });
  }

  goBack() {
    window.history.back();
  }
}
