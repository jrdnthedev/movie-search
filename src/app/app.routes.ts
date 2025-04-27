import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CollectionDetailPageComponent } from './features/collection-detail-page/collection-detail-page.component';
import { MediaDetailsComponent } from './features/media-details/media-details.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'collection-details/:id',
    component: CollectionDetailPageComponent,
  },
  {
    path: 'media-details/:id',
    component: MediaDetailsComponent,
  },
];
