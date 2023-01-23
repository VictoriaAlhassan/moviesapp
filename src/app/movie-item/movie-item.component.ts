import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Movie, MovieResponse } from '../movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent {
  @Input() movie!: Movie;
  @Input() pageNumber: number = 1;

  @Output() itemClick: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) {}
  onItemClick(id: number) {
    this.itemClick.emit(id);
  }
}
