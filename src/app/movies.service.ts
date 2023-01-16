import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies: any;
  constructor(private http: HttpClient) {}
  endPoint =
    'https://api.themoviedb.org/3/movie/76341?api_key=47a316d4e8745085aba3749bca6e3a38';
  getAllMovies(): Observable<any> {
    return this.http.get<any>(this.endPoint);
  }
}
