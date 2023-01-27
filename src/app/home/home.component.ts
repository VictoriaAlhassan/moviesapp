import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../movies.service';
import { MovieResponse } from '../movie';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TvShowResponse } from '../tv';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies!: MovieResponse;
  tvShows!: TvShowResponse;
  movieList!: MovieResponse;
  action: string = 'Movies' || 'Tv shows';
  movieSearched!: MovieResponse;
  resultsLength: number = 0;
  currentTab: string = 'movies';
  pageNumber: number = 1;
  term!: string;

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.moviesService.getMovies();
    this.getMovies();
    this.showSearchResults();
  }
  clickMovies() {
    this.router.navigate(['/movies'], { queryParams: { page: 'page' } });
  }
  clickTv() {
    this.router.navigate(['/tv']);
  }
  onItemClick(id: number) {
    this.router.navigate(['/detail']);
  }

  getMovies() {
    this.currentTab = 'movies';
    this.moviesService.movieObservable().subscribe(
      (data) => {
        this.movieList = data;
        this.movies = this.movieList;

        console.log(data);
      },
      
      (err) => console.log(err),
      () => console.log(`success`)
    );
  }
  getTvShows() {
    this.currentTab = 'tv_shows';

    this.moviesService.getTvShows(1).subscribe((data) => {
      this.movies = data;
    });
  }
  viewAll() {
    if (this.currentTab == 'tv_shows') {
      this.router.navigate(['/tv']);
    } else {
      this.router.navigate(['/movies']);
    }
  }

  showSearchResults() {
    this.moviesService.searchObservable().subscribe((movies) => {
      this.movieSearched = movies;
      this.resultsLength = movies?.results?.length;
      console.log(this.resultsLength);
    });
  }
  getSearchResults(page: number) {
    this.pageNumber = page;
    this.moviesService.searchGetCall(this.moviesService.searchTerm, page);
  }
}
