import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: any;
  api_key = '47a316d4e8745085aba3749bca6e3a38';
  constructor(private http: HttpClient) {}
  endPoint =
    'https://api.themoviedb.org/3/movie/popular?api_key=47a316d4e8745085aba3749bca6e3a38';

  getMovies(): Observable<any> {
    return this.http.get<any>(this.endPoint);
  }
  getMovie(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${this.api_key}`;
    return this.http.get(url);
  }

  getMovieList(list_id: number) {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${list_id}&api_key=${this.api_key}&language=en-US`;
    return this.http.get(url);
  }
  // search(terms:Observable<any>){
  // return terms.debounceTime(400).distinctUntilChanged().switchMap((term: any) =>this.searchEntries(term))
  // }
  getTvShows() {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${this.api_key}&language=en-US&page=1`;
    return this.http.get(url);
  }
  getRecommemded() {
    const url = `https://api.themoviedb.org/3/tv/recommended?api_key=${this.api_key}&language=en-US&page=1`;
  }
}
