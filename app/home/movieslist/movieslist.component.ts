import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-movieslist',
  templateUrl: './movieslist.component.html',
  styleUrls: ['./movieslist.component.css']
})
export class MovieslistComponent implements OnInit {
  date = new Date();
  dateMin = new Date();
  dateMax: Date;
  dateName: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul', 'Aug', 'Sep'
, 'Oct', 'Nov', 'Dec'];
  day: string[] = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ];
  movie: MovieModel[] = [];
  active = 0;
  progress = 0;
  loading = false;
  key: string[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    // interval(250).subscribe((val)=>{
    //   this.progress = val*10;
    // })
    this.loading = true;
    this.dateMax = new Date(this.dateMin.getFullYear(), this.dateMin.getMonth(), this.dateMin.getDate() + 5);
    this.movieService.getAllMovies().subscribe(val => {
      for(let key in val){
        this.movie.push(val[key]);
        
      }
    },
    ()=>{

    },
    ()=>{
      this.loading = false;
    })
  }
}