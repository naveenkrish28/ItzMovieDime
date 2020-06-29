import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/storage";
import { AngularFireDatabase } from "@angular/fire/database";

import { MovieModel } from '../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NewUserModel } from '../models/newuser.model';



@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {
  fg: FormGroup;
  submitted = false;
  file : File = null;
  data: NewUserModel[] = [];
  movie: MovieModel = {
    "name": "", "image": "", "starttime": { "hours": "", "minutes": "", "ampm": "" },
    "endtime": { "hours": "", "minutes": "", "ampm": "" }, "certificate": ""
  };
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  pbarwidth: number = null;
  imageURl: string ;
  movieUploaded = false;
  constructor(private fb: FormBuilder, private movieService: MovieService, 
    public afs: AngularFireStorage, private afd: AngularFireDatabase) { }

  ngOnInit() {
    const dblist = this.afd.object("/login_cred").valueChanges().subscribe((val:any) =>{
      for(const key in val){
        this.data.push(val[key]);
        console.log(val[key])
      }
    });
    this.fg = this.fb.group({
      'name': ['', Validators.required],
      'image': ['', [Validators.required]],
      'starttime': ['', Validators.required],
      'endtime': ['', Validators.required],
      'certificate': ['A', Validators.required]
    })
  }
  onSubmit(formGroup: FormGroup) {
    this.movie.name = formGroup.get('name').value;
    this.setTimeFields(formGroup);
    this.movie.certificate = formGroup.get('certificate').value;

    this.submitted = true;
    if (!formGroup.get('image').errors) {
      this.movieService.addMovie(this.movie).subscribe(() => {

      })
    }
  }
  onReset(formGroup: FormGroup) {
    formGroup.reset();
    this.submitted = false;
  }
  onClearImagePath(formGroup: FormGroup) {
    formGroup.get('image').reset();
    this.submitted = false;
  }
  setTimeFields(formGroup: FormGroup) {
    var stimeh = (formGroup.get('starttime').value)
      .slice(0, (formGroup.get('starttime').value).indexOf(':'));
    var stimem = (formGroup.get('starttime').value)
      .slice((formGroup.get('starttime').value).indexOf(':') + 1,
        (formGroup.get('starttime').value).length)
    var etimeh = (formGroup.get('endtime').value)
      .slice(0, (formGroup.get('endtime').value).indexOf(':'));
    var etimem = (formGroup.get('endtime').value)
      .slice((formGroup.get('endtime').value).indexOf(':') + 1,
        (formGroup.get('endtime').value).length);

    this.movie.starttime.ampm = stimeh >= 12 ? "PM" : "AM";
    this.movie.endtime.ampm = etimeh >= 12 ? "PM" : "AM";

    stimeh = stimeh > 12 ? stimeh - 12 : stimeh;
    stimeh = stimeh == 0 ? 12 : stimeh;
    etimeh = etimeh > 12 ? etimeh - 12 : etimeh;
    etimeh = etimeh == 0 ? 12 : etimeh;

    this.movie.starttime.hours = stimeh.toString();
    this.movie.starttime.minutes = stimem;
    this.movie.endtime.hours = etimeh.toString();
    this.movie.endtime.minutes = etimem;

    this.movie.starttime.hours = this.movie.starttime.hours.length == 1 ?
      "0" + this.movie.starttime.hours : this.movie.starttime.hours;
    this.movie.endtime.hours = this.movie.endtime.hours.length == 1 ?
      "0" + this.movie.endtime.hours : this.movie.endtime.hours;
  }
  onImageChange(event){
    this.ref = this.afs.ref(event.target.files[0].name);
    this.task = this.ref.put(event.target.files[0]);
    this.task.percentageChanges().subscribe( val => {
      this.pbarwidth = val;
    },
    ()=>{

    },
    () => {
      this.pbarwidth = null;
      this.addMovieURL(event)
    })
  }
  addMovieURL(event){
    this.ref = this.afs.ref(event.target.files[0].name);
    this.ref.getDownloadURL().subscribe(url => {
      this.movie.image = url;
    })
  }
}

// function imagePathValidator(control: AbstractControl): { [key: string]: any } | null {
//   var path = control.value;
//   if (path && path.lastIndexOf('.') > 0) {
//     if (path.slice(path.lastIndexOf('.') + 1, path.length) == "png" || path.slice(path.lastIndexOf('.') + 1, path.length) == "jpg") {
//       return null;
//     } else {
//       return {
//         "nopngorjpg": "true"
//       }
//     }
//   } else {
//     return {
//       "nopngorjpg": "true"
//     }
//   }
// }
