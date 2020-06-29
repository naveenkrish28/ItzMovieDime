import { Injectable } from '@angular/core';
import { MovieModel } from '../home/models/movie.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }
  addMovie(movie: MovieModel){
    return this.http.post("https://itzmoviedime.firebaseio.com/movies.json", movie);
  }
  getAllMovies() {
    return this.http.get("https://itzmoviedime.firebaseio.com/movies.json");
  }
}
