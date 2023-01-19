import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesComponent } from './movies/movies.component';
import { TvComponent } from './tv/tv.component';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';
import { MoviesService } from './movies.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieResponse } from './movie';
import { of } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const apiKey = '47a316d4e8745085aba3749bca6e3a38';
const params = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;
  isSearching!: boolean;
  title = 'moviesapp';
  movies: any;

  // searchForm: FormGroup = new FormGroup({
  // search: new FormControl(''),
  // });

  // search() {
  // this.moviesService.searchEntries().subscribe((data) => {
  // this.movies = data;
  // });
  // }

  constructor(private router: Router, private http: HttpClient) {
    this.isSearching = false;
    this.movies = [];
    console.log(this.movieSearchInput);
  }
  ngOnInit(): void {
    fromEvent(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter((res) => res.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.isSearching = true;

        this.searchGetCall(text).subscribe(
          (res) => {
            console.log('res', res);
            this.isSearching = false;
            this.movies = res;
          },
          (err) => {
            this.isSearching = false;
            console.log('error', err);
          }
        );
      });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http.get(
      'https://api.themoviedb.org/3/search/movie?' +
        '&api_key=' +
        apiKey +
        '&query=' +
        term,
      { params: params }
    );
  }
  clickMovies() {
    this.router.navigate(['/movies']);
  }

  clickTv() {
    this.router.navigate(['/tv']);
  }

  clickHome() {
    this.router.navigate(['']);
  }
}
