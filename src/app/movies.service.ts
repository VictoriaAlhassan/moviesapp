import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
// import { debounceTime } from 'rxjs/operators';
// import 'rxjs/add/operator/debounceTime';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: any;
  api_key = '47a316d4e8745085aba3749bca6e3a38';
  total_pages!: number;
  page_num: number = 1;
  query: string = '&query';

  constructor(private http: HttpClient) {}
  endPoint =
    'https://api.themoviedb.org/3/movie/popular?api_key=47a316d4e8745085aba3749bca6e3a38';

  getMovies(): Observable<any> {
    return this.http.get<any>(this.endPoint);
  }
  getMovie(movie_id: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US&api_key=${this.api_key}`;
    return this.http.get(url);
  }
  searchEntries(): Observable<any> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}`;
    return this.http.get(url);
  }

  // getMovieList(list_id: number) {
  // const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${list_id}&api_key=${this.api_key}&language=en-US`;
  // return this.http.get(url);
  // }
  // search(terms:any){
  // return terms.debounceTime(400).distinctUntilChanged().switchMap((term:Observable<string>) => this.searchEntries(term) )

  // }
  // searchEntries(term:Observable<string>){
  // const api =`https://api.themoviedb.org/3/serach/movie?api_key=${this.api_key}&query=${term}`
  // return this.http.get(api)
  // }

  getTvShows(page_num: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${this.api_key}&language=en-US`;
    return this.http.get(url + '&page=' + page_num);
  }
  getAllMovies(page_num: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.api_key}&language=en-US`;
    // this.total_pages = this.movies.total_pages;
    return this.http.get(url + '&page=' + page_num);
  }
}
