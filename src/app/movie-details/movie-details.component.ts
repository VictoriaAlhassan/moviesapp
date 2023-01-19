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

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data);
    });
    this.getMovieDatail(this.id);
  }

  getMovieDatail(id: number) {
    this.moviesService.getMovie(id).subscribe((data) => {
      this.movie = data;
    });
  }
}
