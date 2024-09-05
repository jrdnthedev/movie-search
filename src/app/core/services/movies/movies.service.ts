import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  key = 'a658a848';
  constructor(private http: HttpClient) {}

  getMovies(title: string): Observable<any> {
    return this.http.get(
      `http://www.omdbapi.com/?apikey=${this.key}&t=${title}`
    );
  }

  getMoviesByImdbId(id: string): Observable<any> {
    return this.http.get(`http://www.omdbapi.com/?apikey=${this.key}&i=${id}`);
  }
}
