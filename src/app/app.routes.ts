import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DetailPageComponent } from './features/detail-page/detail-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'details/:id',
    component: DetailPageComponent,
  },
];
