import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
