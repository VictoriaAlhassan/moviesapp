import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieResponse } from '../movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  movies!: MovieResponse;
  pageNumber: number = 1;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    public moviesService: MoviesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getMovieList(1);
  }

  getMovieList(page: number) {
    this.loading = true;
    this.pageNumber = page;
    this.moviesService.getAllMovies(page).subscribe(
      (data) => {
        this.movies = data;

        console.log(data);
        this.loading = false;
      },
      (err) => console.log(err),
      () => console.log(`success`)
    );
  }
  onItemClick(id: number) {
    this.router.navigate(['/detail']);
  }
}
