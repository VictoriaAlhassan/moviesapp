import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css'],
})
export class TvDetailsComponent implements OnInit {
  id!: number;
  movie!: any;
  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = history.state.id;
    this.getTvDatail(this.id);
  }
  getTvDatail(id: number) {
    this.moviesService.getTvShow(id).subscribe((data) => {
      this.movie = data;
    });
  }
}
