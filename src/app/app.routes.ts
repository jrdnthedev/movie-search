import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'movies',
    component: MoviesPageComponent,
  },
  {
    path: 'lists',
    component: ListPageComponent,
  },
];
