import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../movies.service';
import { MovieResponse } from '../movie';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies!: MovieResponse;
  images = 'https://image.tmdb.org/t/p/w500/{{ movie.poster_path }}';

  constructor(private http: HttpClient, private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.getMovies();
    // this.moviesService.getMovies().subscribe((movies) => {
    //   this.movies = movies.results;
    //   console.log(this.movies);
    // });
  }

  // showMovies() {
  // this.moviesService.getAllMovies();
  // console.log(this.moviesService.getAllMovies());
  // }
  getMovies() {
    this.moviesService.getMovies().subscribe(
      (data) => {
        this.movies = data;
        console.log(data);
      },
      (err) => console.log(err),
      () => console.log(`success`)
    );
  }
}
