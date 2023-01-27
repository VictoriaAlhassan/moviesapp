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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;

  title = 'moviesapp';

  loading: boolean = false;
  term!: string;
  page!: number;
  isActive: string = 'home';

  constructor(private router: Router, private moviesService: MoviesService) {
    console.log(this.movieSearchInput);
  }
  ngOnInit(): void {
    console.log(this.router.url);
    fromEvent(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),

        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.moviesService.searchTerm = text;
        this.moviesService.searchGetCall(text);
      });
  }

  clickMovies() {
    this.loading = true;
    this.router.navigate(['/movies'], { queryParams: { page: 1 } });
    this.loading = false;
    this.isActive = 'movies';
  }

  clickTv() {
    this.loading = true;
    this.router.navigate(['/tv']);
    this.loading = false;
    this.isActive = 'tv';
  }

  clickHome() {
    this.moviesService.searchResults.next({
      page: 0,
      total_pages: 0,
      total_results: 0,
      results: [],
    });
    this.movieSearchInput.nativeElement.value = '';
    this.loading = true;
    this.router.navigate(['']);
    this.loading = false;
    this.isActive = 'home';
  }
  checkingIsActive(route: string) {
    return this.isActive === route;
  }
}
