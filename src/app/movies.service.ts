import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
// import { debounceTime } from 'rxjs/operators';
// import 'rxjs/add/operator/debounceTime';
import { Movie, MovieResponse } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: any;
  api_key = '47a316d4e8745085aba3749bca6e3a38';
  total_pages!: number;
  page_num: number = 1;
  query: string = '&query';
  moviesSubject = new Subject<MovieResponse>();
  searchResults = new Subject<MovieResponse>();
  searchTerm: string = '';

  constructor(private http: HttpClient) {}
  endPoint =
    'https://api.themoviedb.org/3/movie/popular?api_key=47a316d4e8745085aba3749bca6e3a38';

  getMovies() {
    return this.http.get<any>(this.endPoint).subscribe((movies) => {
      this.movies = movies;
      this.moviesSubject.next(this.movies);
    });
  }
  movieObservable() {
    return this.moviesSubject.asObservable();
  }
  getMovie(movie_id: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US&api_key=${this.api_key}`;
    return this.http.get(url);
  }

  getTvShow(tv_id: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/tv/${tv_id}?language=en-US&api_key=${this.api_key}`;
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

  searchGetCall(term: string, page: number = 1) {
    console.log(term);
    const params = new HttpParams({
      fromObject: {
        action: 'opensearch',
        format: 'json',
        origin: '*',
      },
    });
    if (term === '') {
      return this.searchResults.next({
        page: 0,
        total_pages: 0,
        total_results: 0,
        results: [],
      });
    } else {
      return this.http
        .get<any>(
          'https://api.themoviedb.org/3/search/movie?' +
            '&api_key=' +
            this.api_key +
            '&query=' +
            term +
            '&page=' +
            page,
          { params: params }
        )
        .subscribe((movies) => {
          if (term != '') {
            this.searchResults.next(movies);
          } else {
            this.searchResults.next({
              page: 0,
              total_pages: 0,
              total_results: 0,
              results: [],
            });
          }
        });
    }
  }
  searchObservable() {
    return this.searchResults.asObservable();
  }
}
