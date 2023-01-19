import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieResponse } from '../movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent {
  movies!: MovieResponse;
  pageNumber: number = 1;

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getTvShows(1);
  }
  getTvShows(page: number) {
    this.pageNumber = page;
    this.moviesService.getTvShows(page).subscribe(
      (data) => {
        this.movies = data;
        console.log(data);
      },
      (err) => console.log(err),
      () => console.log(`success`)
    );
  }
}
