import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieResponse } from '../movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  id!: number;
  movie!: any;
  errorMessage!: string;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.id = history.state.id;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getMovieDatail(this.id);
    });
    // this.getMovieDatail(this.id);
  }

  getMovieDatail(id: number) {
    this.moviesService.getMovie(id).subscribe(
      (data) => {
        this.movie = data;
      },
      (err) => {
        this.errorMessage = 'The resouce you requested could not be found';
        // this.errorMessage = err.message;
        alert(this.errorMessage);
        () => console.log(`success`);
      }
    );
  }
}
