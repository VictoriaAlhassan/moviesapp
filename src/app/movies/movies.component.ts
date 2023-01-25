import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieResponse } from '../movie';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  movies!: MovieResponse;
  pageNumber: number = 1;
  loading: boolean = false;
  movie!: Movie;

  constructor(
    private http: HttpClient,
    public moviesService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pageNumber = params['page'];
      this.getMovieList(this.pageNumber);
    });
  }

  getMovieList(page: number) {
    this.updateUrl(page);
    this.loading = true;
    this.pageNumber = page;
    this.moviesService.getAllMovies(page).subscribe(
      (data) => {
        this.movies = data;

        console.log(data);
        this.loading = false;
      },
      (err) => alert(err),
      () => console.log(`success`)
    );
  }
  updateUrl(pageNumber: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: pageNumber,
      },
      replaceUrl: true,
    });
  }
  onItemClick(id: number) {
    this.router.navigate(['/detail']);
  }
  trackByMovieId(index: number, movie: Movie) {
    return movie.id;
  }
}
