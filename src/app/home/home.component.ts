import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../movies.service';
import { MovieResponse } from '../movie';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies!: MovieResponse;
  movieList!: MovieResponse;
  action: string = 'Movies' || 'Tv shows';

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getMovies();
  }
  clickMovies() {
    this.router.navigate(['/movies']);
  }
  clickTv() {
    this.router.navigate(['/tv']);
  }
  onItemClick(id: number) {
    this.router.navigate(['/detail'], { state: { id } });
  }

  getMovies() {
    this.moviesService.getMovies().subscribe(
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
    this.moviesService.getTvShows(1).subscribe((data) => {
      this.movies = data;
    });
  }

  onButtonClick() {
    if (this.action === 'Movies') {
      this.getMovies();
    } else if (this.action === 'Tv Shows') {
      this.getTvShows();
    }
  }
}
