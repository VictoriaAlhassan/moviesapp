import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any;
  constructor(private http: HttpClient, private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  // showMovies() {
  // this.moviesService.getAllMovies();
  // console.log(this.moviesService.getAllMovies());
  // }
}
