import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  key = 'a658a848';
  private http = inject(HttpClient);
  private cache: Map<string, any> = new Map();

  getMovies(title: string): Observable<any> {
    const cacheKey = title;
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      console.log('Returning cached data');
      return of(cachedData);
    }

    return this.http
      .get(`https://www.omdbapi.com/?apikey=${this.key}&t=${title}`)
      .pipe(
        tap((data) => {
          this.cache.set(title, data);
        })
      );
  }

  // getMoviesByImdbId(id: string): Observable<any> {
  //   return this.http.get(`https://www.omdbapi.com/?apikey=${this.key}&i=${id}`);
  // }
}
