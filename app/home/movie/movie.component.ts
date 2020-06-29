import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../models/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  params: string;
  currMovie: MovieModel ={ 'name':'', 'image':'','certificate':'','starttime':{'hours':'',
  'minutes':'','ampm':''},'endtime':{'hours':'','minutes':'','ampm':''}};
  loading = false;
  constructor(private route: ActivatedRoute,private movie: MovieService) { }
 
  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe(val => {
      this.params = val.get('id');
      this.getMovie();
    })
  }
  getMovie(){
    this.movie.getAllMovies().subscribe(val=>{
      for(let key in val){
        if(this.params == val[key].name){
          this.currMovie = val[key]
        }
      }
    }, ()=>{

    },()=>{
      this.loading = false;
    })
  }

}
